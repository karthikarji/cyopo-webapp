import { useAppDispatch, useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectPortfolioFilters } from "@cyopo/Pages/portfolio/common/redux/selectors/Portfolio.selector";
import { setPortfolioFilters } from "@cyopo/Pages/portfolio/common/redux/actions/Portfolio.actions";
import type { PortfolioStatus } from "@cyopo/Models/portfolio/portfolio.model";

const usePortfolioFilter = () => {
  const dispatch = useAppDispatch();
  const filters = useAppSelector(selectPortfolioFilters);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPortfolioFilters({ search: e.target.value }));
  };

  const handleTabChange = (value: PortfolioStatus | "all") => {
    dispatch(setPortfolioFilters({ status: value, page: 1 }));
  };

  const handleClearSearch = () => {
    dispatch(setPortfolioFilters({ search: "" }));
  };

  return {
    state: {
      search: filters.search ?? "",
      activeTab: filters.status ?? "all",
    },
    handlers: {
      handleSearchChange,
      handleTabChange,
      handleClearSearch,
    },
  };
};

export default usePortfolioFilter;
