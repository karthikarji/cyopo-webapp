import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectPortfolios } from "@cyopo/Pages/portfolio/common/redux/selectors/Portfolio.selector";
import { setPortfolios } from "@cyopo/Pages/portfolio/common/redux/actions/Portfolio.actions";
import { PortfolioAPIService } from "@cyopo/Services/api/portfolio/PortfolioAPIService";
import MessageAPIService from "@cyopo/Services/api/message/MessageAPIService";
import type { ContactMessage, ContactStats } from "@cyopo/Services/api/message/MessageAPIService";

export interface PortfolioMessages {
  portfolioId: string;
  portfolioName: string;
  portfolioSlug: string;
  stats: ContactStats;
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

  // Fetch portfolios if Redux state is empty (direct page load)
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

  // Load message stats for all portfolios when portfolio list is ready
  useEffect(() => {
    if (portfolios.length === 0) return;
    const init = async () => {
      const rows = await Promise.all(
        portfolios.map(async (p) => {
          try {
            const stats = await MessageAPIService.getStats(p.id);
            return {
              portfolioId: p.id,
              portfolioName: p.name,
              portfolioSlug: p.slug,
              stats,
              messages: [],
              isLoading: false,
              isExpanded: false,
            };
          } catch {
            return {
              portfolioId: p.id,
              portfolioName: p.name,
              portfolioSlug: p.slug,
              stats: { total: 0, unread: 0 },
              messages: [],
              isLoading: false,
              isExpanded: false,
            };
          }
        }),
      );
      setData(rows);
    };
    init();
  }, [portfolios]);

  const handleExpand = async (portfolioId: string) => {
    // Capture state BEFORE toggling
    const row = data.find((p) => p.portfolioId === portfolioId);

    // Toggle expanded
    setData((prev) => prev.map((p) => (p.portfolioId === portfolioId ? { ...p, isExpanded: !p.isExpanded } : p)));

    // Only load messages if currently collapsed and not yet loaded
    if (!row || row.isExpanded || row.messages.length > 0) return;

    setData((prev) => prev.map((p) => (p.portfolioId === portfolioId ? { ...p, isLoading: true } : p)));

    try {
      const messages = await MessageAPIService.getMessages(portfolioId);
      setData((prev) => prev.map((p) => (p.portfolioId === portfolioId ? { ...p, messages, isLoading: false } : p)));
    } catch {
      setData((prev) => prev.map((p) => (p.portfolioId === portfolioId ? { ...p, isLoading: false } : p)));
    }
  };

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
