import type { Portfolio, PortfolioFilters } from "@cyopo/Models/portfolio/portfolio.model";

export interface PortfolioState {
  portfolios: Portfolio[];
  selected: Portfolio | null;
  total: number;
  page: number;
  totalPages: number;
  filters: PortfolioFilters;
  isLoading: boolean;
  error: string | null;
}

export const PortfolioInitialState: PortfolioState = {
  portfolios: [],
  selected: null,
  total: 0,
  page: 1,
  totalPages: 1,
  filters: { status: "all", search: "", page: 1, limit: 12 },
  isLoading: false,
  error: null,
};
