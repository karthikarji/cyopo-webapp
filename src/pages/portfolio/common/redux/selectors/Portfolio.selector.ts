import type { RootState } from "@cyopo/Redux/store/ReduxStore";

export const selectPortfolios = (state: RootState) => state.cyopo.portfolio.list.portfolios;
export const selectSelectedPortfolio = (state: RootState) => state.cyopo.portfolio.list.selected;
export const selectPortfolioTotal = (state: RootState) => state.cyopo.portfolio.list.total;
export const selectPortfolioLoading = (state: RootState) => state.cyopo.portfolio.list.isLoading;
export const selectPortfolioError = (state: RootState) => state.cyopo.portfolio.list.error;
export const selectPortfolioFilters = (state: RootState) => state.cyopo.portfolio.list.filters;
