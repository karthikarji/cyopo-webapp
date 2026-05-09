import React from "react";
import type { StatCardItem } from "../DashboardStats.model.d";

interface Props {
  item: StatCardItem;
  value: number;
  trend?: number;
  sub?: number;
  isLoading: boolean;
  formatNumber: (n: number) => string;
}

const DashboardStatCard: React.FC<Props> = ({ item, value, trend, sub, isLoading, formatNumber }) => {
  const hasTrend = trend !== undefined && item.trendKey;
  const trendUp = (trend ?? 0) >= 0;

  return (
    <div
      className={[
        "bg-surface border border-outline-variant/30",
        "rounded-2xl shadow-sm p-5 sm:p-6",
        "flex flex-col gap-3",
        "hover:shadow-md hover:border-primary/20",
        "transition-all duration-200",
      ].join(" ")}>
      {/* Icon + label */}
      <div className='flex items-center justify-between'>
        <p className='text-xs sm:text-sm font-medium text-on-surface-variant'>{item.label}</p>
        <div className='w-9 h-9 rounded-xl bg-secondary-container flex items-center justify-center'>
          <span className='material-symbols-outlined text-primary text-[18px]'>{item.icon}</span>
        </div>
      </div>

      {/* Value */}
      {isLoading ? (
        <div className='h-8 w-24 bg-surface-container-highest rounded-lg animate-pulse' />
      ) : (
        <p className='font-headline font-bold text-on-surface text-2xl sm:text-3xl'>{formatNumber(value)}</p>
      )}

      {/* Trend or sub label */}
      {isLoading ? (
        <div className='h-4 w-16 bg-surface-container-highest rounded animate-pulse' />
      ) : hasTrend ? (
        <p className={["text-xs font-medium flex items-center gap-1", trendUp ? "text-success" : "text-error"].join(" ")}>
          <span className='material-symbols-outlined text-[14px]'>{trendUp ? "trending_up" : "trending_down"}</span>
          {Math.abs(trend ?? 0)}% {item.trendLabel}
        </p>
      ) : item.subLabel && sub !== undefined ? (
        <p className='text-xs text-on-surface-variant'>
          <span className='font-medium text-on-surface'>{sub}</span> {item.subLabel}
        </p>
      ) : item.subLabel ? (
        <p className='text-xs text-on-surface-variant'>{item.subLabel}</p>
      ) : null}
    </div>
  );
};

export default DashboardStatCard;
