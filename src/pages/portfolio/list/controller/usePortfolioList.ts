import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectPortfolios, selectPortfolioLoading, selectPortfolioFilters } from "@cyopo/Pages/portfolio/common/redux/selectors/Portfolio.selector";
import {
  setPortfolios,
  setPortfolioLoading,
  setPortfolioError,
  removePortfolio,
  updatePortfolio,
} from "@cyopo/Pages/portfolio/common/redux/actions/Portfolio.actions";
import { PortfolioAPIService } from "@cyopo/Services/api/portfolio/PortfolioAPIService";
import Notify from "@cyopo/Services/notification/Notify";
import Spinner from "@cyopo/Services/spinner/Spinner";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";

const usePortfolioList = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const portfolios = useAppSelector(selectPortfolios) ?? [];
  const isLoading = useAppSelector(selectPortfolioLoading);
  const filters = useAppSelector(selectPortfolioFilters);

  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [deleteTargetId, setDeleteTargetId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Fetch portfolios when filters change
  useEffect(() => {
    const fetch = async () => {
      try {
        dispatch(setPortfolioLoading(true));
        const data = await PortfolioAPIService.getPortfolios({
          status: filters.status === "all" ? undefined : filters.status,
          search: filters.search || undefined,
          page: filters.page ?? 1,
          limit: filters.limit ?? 12,
        });
        dispatch(
          setPortfolios({
            portfolios: data.portfolios,
            total: data.total,
            page: data.page,
            totalPages: data.totalPages,
          }),
        );
      } catch (err: any) {
        dispatch(setPortfolioError(err?.message ?? "Failed to load portfolios"));
        Notify.error(err?.message ?? "Failed to load portfolios");
      }
    };

    fetch();
  }, [dispatch, filters.status, filters.search, filters.page]);

  // Filter locally for search
  const filteredPortfolios = portfolios.filter((p) => {
    const matchesSearch =
      !filters.search || p.name.toLowerCase().includes(filters.search.toLowerCase()) || p.slug.toLowerCase().includes(filters.search.toLowerCase());
    return matchesSearch;
  });

  const handleEdit = (id: string) => navigate(`/portfolios/${id}/edit`);
  const handleViewLive = (slug: string) => window.open(`/p/${slug}`, "_blank");
  const handleMenuOpen = (id: string) => setMenuOpenId(id);
  const handleMenuClose = () => setMenuOpenId(null);
  const handleCreateNew = () => navigate(ROUTES.PORTFOLIO_NEW);

  const handleDuplicate = async (id: string) => {
    try {
      const duplicated = await Spinner.on(PortfolioAPIService.duplicatePortfolio(id));
      dispatch(
        setPortfolios({
          portfolios: [duplicated, ...portfolios],
          total: portfolios.length + 1,
          page: 1,
          totalPages: 1,
        }),
      );
      Notify.success("Portfolio duplicated successfully");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to duplicate portfolio");
    }
    setMenuOpenId(null);
  };

  const handleStatusChange = async (id: string, status: string) => {
    try {
      const updated = await Spinner.on(PortfolioAPIService.updateStatus(id, status));
      dispatch(updatePortfolio(updated));
      Notify.success(`Portfolio ${status} successfully`);
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to update status");
    }
    setMenuOpenId(null);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteTargetId(id);
    setMenuOpenId(null);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTargetId) return;
    try {
      setIsDeleting(true);
      await PortfolioAPIService.deletePortfolio(deleteTargetId);
      dispatch(removePortfolio(deleteTargetId));
      Notify.success("Portfolio deleted");
    } catch (err: any) {
      Notify.error(err?.message ?? "Failed to delete portfolio");
    } finally {
      setIsDeleting(false);
      setDeleteTargetId(null);
    }
  };

  const handleDeleteCancel = () => setDeleteTargetId(null);

  const handleAction = (action: string, portfolio: Portfolio) => {
    switch (action) {
      case "edit":
        handleEdit(portfolio.id);
        break;
      case "duplicate":
        handleDuplicate(portfolio.id);
        break;
      case "publish":
        handleStatusChange(portfolio.id, "published");
        break;
      case "archive":
        handleStatusChange(portfolio.id, "archived");
        break;
      case "view":
        handleViewLive(portfolio.slug);
        break;
      case "delete":
        handleDeleteClick(portfolio.id);
        break;
    }
  };

  return {
    state: {
      portfolios: filteredPortfolios,
      isLoading,
      menuOpenId,
      deleteTargetId,
      isDeleting,
      isEmpty: filteredPortfolios.length === 0 && !isLoading,
      isFiltered: !!(filters.search || filters.status !== "all"),
    },
    handlers: {
      handleEdit,
      handleCreateNew,
      handleMenuOpen,
      handleMenuClose,
      handleAction,
      handleDeleteConfirm,
      handleDeleteCancel,
    },
  };
};

export default usePortfolioList;
