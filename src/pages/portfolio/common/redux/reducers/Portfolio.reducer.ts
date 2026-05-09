import { createReducer, PayloadAction } from "@reduxjs/toolkit";
import { PortfolioInitialState, PortfolioState } from "../states/Portfolio.state";
import type { Portfolio, PortfolioFilters } from "@cyopo/Models/portfolio/portfolio.model";
import {
  setPortfolios,
  setSelectedPortfolio,
  addPortfolio,
  updatePortfolio,
  removePortfolio,
  setPortfolioLoading,
  setPortfolioError,
  setPortfolioFilters,
} from "../actions/Portfolio.actions";

const PortfolioReducer = createReducer(PortfolioInitialState, (builder) => {
  builder
    .addCase(setPortfolios, (state, action) => {
      state.portfolios = action.payload.portfolios;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.isLoading = false;
      state.error = null;
    })
    .addCase(setSelectedPortfolio, (state, action: PayloadAction<Portfolio | null>) => {
      state.selected = action.payload;
    })
    .addCase(addPortfolio, (state, action: PayloadAction<Portfolio>) => {
      state.portfolios.unshift(action.payload);
      state.total++;
    })
    .addCase(updatePortfolio, (state, action: PayloadAction<Portfolio>) => {
      const index = state.portfolios.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) state.portfolios[index] = action.payload;
      if (state.selected?.id === action.payload.id) {
        state.selected = action.payload;
      }
    })
    .addCase(removePortfolio, (state, action: PayloadAction<string>) => {
      state.portfolios = state.portfolios.filter((p) => p.id !== action.payload);
      state.total = Math.max(0, state.total - 1);
      if (state.selected?.id === action.payload) {
        state.selected = null;
      }
    })
    .addCase(setPortfolioLoading, (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    })
    .addCase(setPortfolioError, (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    })
    .addCase(setPortfolioFilters, (state, action: PayloadAction<Partial<PortfolioFilters>>) => {
      state.filters = { ...state.filters, ...action.payload };
    });
});

export default PortfolioReducer;
