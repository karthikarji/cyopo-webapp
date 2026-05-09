import React from "react";
import useDashboardChart from "../controller/useDashboardChart";
import { CHART_TITLE, CHART_ANALYTICS_LINK, QUICK_ACTIONS } from "../DashboardChart.constants";

const DashboardChart: React.FC = () => {
  const { state, handlers } = useDashboardChart();

  return (
    <div className={["bg-surface border border-outline-variant/30", "rounded-2xl shadow-sm", "flex flex-col"].join(" ")}>
      {/* Header */}
      <div className='flex items-center justify-between px-5 pt-5 pb-3 border-b border-outline-variant/20'>
        <h3 className='font-headline font-bold text-on-surface text-base'>{CHART_TITLE}</h3>
        <button onClick={handlers.handleAnalyticsClick} className='text-xs font-medium text-primary hover:underline'>
          {CHART_ANALYTICS_LINK}
        </button>
      </div>

      {/* Bar chart */}
      <div className='px-5 pt-5 pb-4'>
        <div className='flex items-end justify-between gap-1.5 h-28'>
          {state.chartData.map((point, index) => {
            const heightPct = state.hasData ? Math.max((point.views / state.maxViews) * 100, 4) : 20;
            const isToday = index === new Date().getDay() - 1;

            return (
              <div key={point.day} className='flex flex-col items-center gap-1.5 flex-1'>
                <div className='w-full flex flex-col justify-end h-20'>
                  <div
                    className={[
                      "w-full rounded-t-md transition-all duration-500",
                      isToday ? "bg-primary" : "bg-surface-container-high hover:bg-secondary-container",
                    ].join(" ")}
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className={["text-[10px] font-medium", isToday ? "text-primary" : "text-on-surface-variant"].join(" ")}>{point.day}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Divider */}
      <div className='mx-5 border-t border-outline-variant/20' />

      {/* Quick actions */}
      <div className='px-3 py-3 flex flex-col gap-1'>
        <p className='px-2 text-xs font-medium text-on-surface-variant mb-1'>Quick actions</p>
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action.action}
            onClick={() => handlers.handleQuickAction(action.action)}
            className={[
              "flex items-center gap-3 px-3 py-2.5 rounded-xl",
              "hover:bg-surface-container transition-colors duration-150",
              "text-left w-full",
            ].join(" ")}>
            <div className='w-8 h-8 rounded-lg bg-surface-container-high flex items-center justify-center flex-shrink-0'>
              <span className={`material-symbols-outlined text-[18px] ${action.color}`}>{action.icon}</span>
            </div>
            <div>
              <p className='text-sm font-medium text-on-surface'>{action.label}</p>
              <p className='text-xs text-on-surface-variant'>{action.subLabel}</p>
            </div>
            <span className='material-symbols-outlined text-[16px] text-on-surface-variant ml-auto'>chevron_right</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardChart;
