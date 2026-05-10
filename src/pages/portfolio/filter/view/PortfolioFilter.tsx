import React from "react";
import { Search, X } from "lucide-react";
import { STATUS_TABS } from "../../list/PortfolioList.constants";
import { FILTER_SEARCH_PLACEHOLDER } from "../PortfolioFilter.constants";
import usePortfolioFilter from "../controller/usePortfolioFilter";
import type { PortfolioStatus } from "@cyopo/Models/portfolio/portfolio.model";

const PortfolioFilter: React.FC = () => {
  const { state, handlers } = usePortfolioFilter();

  return (
    <div className='flex flex-col sm:flex-row gap-3 mb-6'>
      {/* Status tabs */}
      <div className='flex items-center gap-1 bg-surface-container-low rounded-xl p-1 overflow-x-auto flex-shrink-0'>
        {STATUS_TABS.map((tab) => {
          const isActive = state.activeTab === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => handlers.handleTabChange(tab.value as PortfolioStatus | "all")}
              className={[
                "px-4 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-200",
                isActive ? "bg-surface text-on-surface shadow-sm" : "text-on-surface-variant hover:text-on-surface",
              ].join(" ")}>
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Search input */}
      <div className='relative flex-1 max-w-xs'>
        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant' />
        <input
          type='text'
          value={state.search}
          onChange={handlers.handleSearchChange}
          placeholder={FILTER_SEARCH_PLACEHOLDER}
          className={[
            "w-full pl-9 pr-9 py-2 rounded-xl text-sm",
            "bg-surface border border-outline-variant/30",
            "text-on-surface placeholder:text-on-surface-variant/50",
            "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/40",
            "transition-all duration-200",
          ].join(" ")}
        />
        {state.search && (
          <button
            onClick={handlers.handleClearSearch}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface'>
            <X size={14} />
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioFilter;
