export interface ChartDataPoint {
  day: string;
  views: number;
  visitors: number;
}

export interface QuickAction {
  label: string;
  subLabel: string;
  icon: string;
  color: string;
  action: string;
}
