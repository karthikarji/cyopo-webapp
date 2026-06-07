import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectPortfolios } from "@cyopo/Pages/portfolio/common/redux/selectors/Portfolio.selector";
import { setPortfolios } from "@cyopo/Pages/portfolio/common/redux/actions/Portfolio.actions";
import { PortfolioAPIService } from "@cyopo/Services/api/portfolio/PortfolioAPIService";
import MessageAPIService from "@cyopo/Services/api/message/MessageAPIService";
import type { ContactMessage } from "@cyopo/Services/api/message/MessageAPIService";

export interface PortfolioMessages {
  portfolioId: string;
  portfolioName: string;
  portfolioSlug: string;
  stats: { total: number; unread: number };
  messages: ContactMessage[];
  isLoading: boolean;
  isExpanded: boolean;
}

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const useMessagesPage = () => {
  const dispatch = useAppDispatch();
  const portfolios = useAppSelector(selectPortfolios);

  const [data, setData] = useState<PortfolioMessages[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isLoadingPortfolios, setIsLoadingPortfolios] = useState(false);

  const totalUnread = data.reduce((sum, p) => sum + p.stats.unread, 0);

  // ─── Step 1: Ensure portfolios are in Redux ────────────────────────
  useEffect(() => {
    if (portfolios.length > 0) return;
    const load = async () => {
      try {
        setIsLoadingPortfolios(true);
        const result = await PortfolioAPIService.getPortfolios();
        dispatch(setPortfolios(result));
      } catch {
        // Silently fail
      } finally {
        setIsLoadingPortfolios(false);
      }
    };
    load();
  }, []);

  // ─── Step 2: Single call to get ALL portfolio stats ────────────────
  //
  // Previously: N calls (one per portfolio) for stats on page load
  // Now: 1 call to /api/v1/user/messages/stats-all
  // Backend includes portfolioId, portfolioName, portfolioSlug in response
  // so we don't even need Redux portfolios to build the rows
  //
  useEffect(() => {
    const load = async () => {
      try {
        setIsLoadingPortfolios(true);
        const allStats = await MessageAPIService.getAllStats();

        setData(
          allStats.map((s) => ({
            portfolioId: s.portfolioId,
            portfolioName: s.portfolioName,
            portfolioSlug: s.portfolioSlug,
            stats: { total: s.total, unread: s.unread },
            messages: [],
            isLoading: false,
            isExpanded: false,
          })),
        );
      } catch {
        // Silently fail — show empty state
      } finally {
        setIsLoadingPortfolios(false);
      }
    };
    load();
  }, []); // ← runs once on mount, no portfolio dependency needed

  // ─── Expand portfolio — lazy load messages ─────────────────────────
  const handleExpand = async (portfolioId: string) => {
    const row = data.find((p) => p.portfolioId === portfolioId);

    setData((prev) => prev.map((p) => (p.portfolioId === portfolioId ? { ...p, isExpanded: !p.isExpanded } : p)));

    // Only load if expanding and not yet loaded
    if (!row || row.isExpanded || row.messages.length > 0) return;

    setData((prev) => prev.map((p) => (p.portfolioId === portfolioId ? { ...p, isLoading: true } : p)));

    try {
      const messages = await MessageAPIService.getMessages(portfolioId);
      setData((prev) => prev.map((p) => (p.portfolioId === portfolioId ? { ...p, messages, isLoading: false } : p)));
    } catch {
      setData((prev) => prev.map((p) => (p.portfolioId === portfolioId ? { ...p, isLoading: false } : p)));
    }
  };

  // ─── Open message — mark as read ──────────────────────────────────
  const handleOpenMessage = async (message: ContactMessage) => {
    setSelectedMessage(message);
    if (message.status !== "UNREAD") return;

    try {
      await MessageAPIService.markAsRead(message.id);
      setData((prev) =>
        prev.map((p) => ({
          ...p,
          messages: p.messages.map((m) => (m.id === message.id ? { ...m, status: "READ" as const } : m)),
          stats: p.portfolioId === message.portfolioId ? { ...p.stats, unread: Math.max(0, p.stats.unread - 1) } : p.stats,
        })),
      );
    } catch {
      // Silently fail
    }
  };

  const handleCloseMessage = () => setSelectedMessage(null);

  return {
    state: {
      data,
      selectedMessage,
      totalUnread,
      isLoadingPortfolios,
    },
    handlers: {
      handleExpand,
      handleOpenMessage,
      handleCloseMessage,
      formatDate,
    },
  };
};

export default useMessagesPage;
