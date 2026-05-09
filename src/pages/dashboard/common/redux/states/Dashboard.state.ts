export interface DashboardStats {
  totalPortfolios: number;
  publishedCount: number;
  totalViews: number;
  viewsTrend: number;
  uniqueVisitors: number;
  visitorsTrend: number;
  unreadMessages: number;
}

export interface DashboardState {
  stats: DashboardStats | null;
  isLoading: boolean;
  error: string | null;
}

export const DashboardInitialState: DashboardState = {
  stats: null,
  isLoading: false,
  error: null,
};
