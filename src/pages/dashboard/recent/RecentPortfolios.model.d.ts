import type { PortfolioStatus } from "@cyopo/Models/portfolio/portfolio.model";

export interface StatusConfig {
  label: string;
  bg: string;
  text: string;
  dot: string;
}

export type StatusConfigMap = Record<PortfolioStatus, StatusConfig>;
