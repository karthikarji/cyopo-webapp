import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectPortfolios, selectPortfolioLoading } from "@cyopo/Pages/portfolio/common/redux/selectors/Portfolio.selector";
import { setPortfolios, setPortfolioLoading, setPortfolioError } from "@cyopo/Pages/portfolio/common/redux/actions/Portfolio.actions";
import { PortfolioAPIService } from "@cyopo/Services/api/portfolio/PortfolioAPIService";
import { ROUTES } from "@cyopo/Constants/route/Route.constants";
import { RECENT_LIMIT } from "../RecentPortfolios.constants";

const useRecentPortfolios = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const portfolios = useAppSelector(selectPortfolios) ?? [];
  const isLoading = useAppSelector(selectPortfolioLoading);

  useEffect(() => {
    const fetch = async () => {
      if (portfolios.length > 0) return;
      try {
        dispatch(setPortfolioLoading(true));
        const data = await PortfolioAPIService.getPortfolios({
          limit: RECENT_LIMIT,
          page: 1,
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
      }
    };

    fetch();
  }, [dispatch, portfolios.length]);

  const handleViewAll = () => navigate(ROUTES.PORTFOLIOS);
  const handleCreateNew = () => navigate(ROUTES.PORTFOLIO_NEW);
  const handlePortfolioClick = (id: string) => navigate(`/portfolios/${id}/edit`);

  const recentPortfolios = portfolios.slice(0, RECENT_LIMIT);

  return {
    state: {
      portfolios: recentPortfolios,
      isLoading,
      isEmpty: portfolios.length === 0 && !isLoading,
    },
    handlers: {
      handleViewAll,
      handleCreateNew,
      handlePortfolioClick,
    },
  };
};

export default useRecentPortfolios;
