import React from "react";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";
import { STATUS_CONFIG } from "../RecentPortfolios.constants";

interface Props {
  portfolio: Portfolio;
  onClick: (id: string) => void;
}

const RecentPortfolioItem: React.FC<Props> = ({ portfolio, onClick }) => {
  const status = STATUS_CONFIG[portfolio.status];

  const updatedAt = new Date(portfolio.updatedAt);
  const daysAgo = Math.floor((Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));
  const timeLabel = daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo} days ago`;

  return (
    <button
      onClick={() => onClick(portfolio.id)}
      className={[
        "w-full flex items-center gap-3 p-3 rounded-xl",
        "hover:bg-surface-container transition-colors duration-150",
        "text-left group",
      ].join(" ")}>
      {/* Template color thumbnail */}
      <div className='w-10 h-10 rounded-lg bg-secondary-container flex items-center justify-center flex-shrink-0'>
        <span className='material-symbols-outlined text-primary text-[18px]' style={{ fontVariationSettings: "'FILL' 1" }}>
          folder_special
        </span>
      </div>

      {/* Info */}
      <div className='flex-1 min-w-0'>
        <p className='font-medium text-sm text-on-surface truncate'>{portfolio.name}</p>
        <p className='text-xs text-on-surface-variant truncate'>cyopo.com/{portfolio.slug}</p>
      </div>

      {/* Status + time */}
      <div className='flex flex-col items-end gap-1 flex-shrink-0'>
        <span className={["inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium", status.bg, status.text].join(" ")}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
        <span className='text-xs text-on-surface-variant'>{timeLabel}</span>
      </div>
    </button>
  );
};

export default RecentPortfolioItem;
