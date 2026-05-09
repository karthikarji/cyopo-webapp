import React from "react";
import { Plus } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import RecentPortfolioItem from "./RecentPortfolioItem";
import useRecentPortfolios from "../controller/useRecentPortfolios";
import { RECENT_TITLE, RECENT_VIEW_ALL, RECENT_EMPTY_TITLE, RECENT_EMPTY_SUB, RECENT_EMPTY_CTA } from "../RecentPortfolios.constants";

const RecentPortfoliosSkeleton: React.FC = () => (
  <div className='flex flex-col gap-2'>
    {[1, 2, 3].map((i) => (
      <div key={i} className='flex items-center gap-3 p-3'>
        <div className='w-10 h-10 rounded-lg bg-surface-container-highest animate-pulse flex-shrink-0' />
        <div className='flex-1 flex flex-col gap-2'>
          <div className='h-3 w-3/4 bg-surface-container-highest rounded animate-pulse' />
          <div className='h-2 w-1/2 bg-surface-container-highest rounded animate-pulse' />
        </div>
        <div className='h-5 w-16 bg-surface-container-highest rounded-full animate-pulse' />
      </div>
    ))}
  </div>
);

const RecentPortfolios: React.FC = () => {
  const { state, handlers } = useRecentPortfolios();

  return (
    <div className={["bg-surface border border-outline-variant/30", "rounded-2xl shadow-sm", "flex flex-col"].join(" ")}>
      {/* Header */}
      <div className='flex items-center justify-between px-5 pt-5 pb-3 border-b border-outline-variant/20'>
        <h3 className='font-headline font-bold text-on-surface text-base'>{RECENT_TITLE}</h3>
        {!state.isEmpty && (
          <button onClick={handlers.handleViewAll} className='text-xs font-medium text-primary hover:underline'>
            {RECENT_VIEW_ALL}
          </button>
        )}
      </div>

      {/* Content */}
      <div className='flex-1 px-2 py-2'>
        {state.isLoading ? (
          <RecentPortfoliosSkeleton />
        ) : state.isEmpty ? (
          /* Empty state */
          <div className='flex flex-col items-center justify-center py-10 px-4 text-center'>
            <div className='w-14 h-14 rounded-2xl bg-surface-container flex items-center justify-center mb-4'>
              <span className='material-symbols-outlined text-on-surface-variant text-2xl'>folder_open</span>
            </div>
            <p className='font-medium text-on-surface text-sm mb-1'>{RECENT_EMPTY_TITLE}</p>
            <p className='text-xs text-on-surface-variant mb-4 max-w-[200px] leading-relaxed'>{RECENT_EMPTY_SUB}</p>
            <Button variant='primary' size='sm' leftIcon={<Plus size={14} />} onClick={handlers.handleCreateNew}>
              {RECENT_EMPTY_CTA}
            </Button>
          </div>
        ) : (
          /* Portfolio list */
          <div className='flex flex-col'>
            {state.portfolios.map((portfolio) => (
              <RecentPortfolioItem key={portfolio.id} portfolio={portfolio} onClick={handlers.handlePortfolioClick} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentPortfolios;
