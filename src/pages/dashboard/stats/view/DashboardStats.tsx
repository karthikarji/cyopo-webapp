import React from "react";
import DashboardStatCard from "./DashboardStatCard";
import useDashboardStats from "../controller/useDashboardStats";
import { STAT_CARDS } from "../DashboardStats.constants";

const DashboardStats: React.FC = () => {
  const { state, handlers } = useDashboardStats();

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6'>
      {STAT_CARDS.map((card) => (
        <DashboardStatCard
          key={card.valueKey}
          item={card}
          value={handlers.getStatValue(card.valueKey)}
          trend={card.trendKey ? handlers.getStatValue(card.trendKey) : undefined}
          sub={card.subKey ? handlers.getStatValue(card.subKey) : undefined}
          isLoading={state.isLoading}
          formatNumber={handlers.formatNumber}
        />
      ))}
    </div>
  );
};

export default DashboardStats;
