import { createAction } from "@reduxjs/toolkit";
import type { Portfolio, PortfolioFilters } from "@cyopo/Models/portfolio/portfolio.model";

export const setPortfolios = createAction<{
  portfolios: Portfolio[];
  total: number;
  page: number;
  totalPages: number;
}>("portfolio/SET_PORTFOLIOS");

export const setSelectedPortfolio = createAction<Portfolio | null>("portfolio/SET_SELECTED");
export const addPortfolio = createAction<Portfolio>("portfolio/ADD");
export const updatePortfolio = createAction<Portfolio>("portfolio/UPDATE");
export const removePortfolio = createAction<string>("portfolio/REMOVE");
export const setPortfolioLoading = createAction<boolean>("portfolio/SET_LOADING");
export const setPortfolioError = createAction<string | null>("portfolio/SET_ERROR");
export const setPortfolioFilters = createAction<Partial<PortfolioFilters>>("portfolio/SET_FILTERS");
