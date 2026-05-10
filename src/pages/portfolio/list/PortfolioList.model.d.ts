import type { PortfolioStatus } from "@cyopo/Models/portfolio/portfolio.model";

export interface PortfolioActionItem {
  label: string;
  icon: string;
  action: string;
  danger?: boolean;
}

export interface StatusTab {
  label: string;
  value: PortfolioStatus | "all";
}
