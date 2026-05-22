import React from "react";
import useAnalyticsPage from "./controller/useAnalyticsPage";
import AnalyticsStats from "./stats/view/AnalyticsStats";
import AnalyticsChart from "./chart/view/AnalyticsChart";

const AnalyticsPage: React.FC = () => {
  const { state, handlers } = useAnalyticsPage();
  const { data, isLoading, error, interval, chartData } = state;

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-24'>
        <div className='w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center py-24 gap-3'>
        <span className='material-symbols-outlined text-4xl text-error'>error</span>
        <p className='text-on-surface-variant text-sm'>{error}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-6'>
      {/* Header */}
      <div>
        <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl'>Analytics</h1>
        <p className='text-sm text-on-surface-variant mt-1'>How your portfolios are performing</p>
      </div>

      {/* Stat cards */}
      {data && <AnalyticsStats data={data} />}

      {/* Chart */}
      <AnalyticsChart chartData={chartData} interval={interval} onIntervalChange={handlers.handleIntervalChange} />

      {/* Portfolio breakdown */}
      {(data?.portfolioBreakdown ?? []).length > 0 && (
        <div className='bg-surface border border-outline-variant/20 rounded-2xl overflow-hidden'>
          <div className='px-5 py-4 border-b border-outline-variant/20'>
            <h2 className='font-semibold text-on-surface'>Portfolio Breakdown</h2>
          </div>
          <div className='divide-y divide-outline-variant/10'>
            {data!.portfolioBreakdown.map((p) => (
              <div key={p.portfolioId} className='flex items-center gap-4 px-5 py-4 hover:bg-surface-container/30 transition-colors'>
                <div className='flex-1 min-w-0'>
                  <p className='font-medium text-sm text-on-surface truncate'>{p.portfolioName}</p>
                  <p className='text-xs text-on-surface-variant'>/{p.portfolioSlug}</p>
                </div>
                <div className='flex items-center gap-6 flex-shrink-0'>
                  <div className='text-right'>
                    <p className='font-semibold text-on-surface text-sm'>{p.views.toLocaleString()}</p>
                    <p className='text-[10px] text-on-surface-variant uppercase tracking-wide'>Views</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold text-on-surface text-sm'>{p.uniqueVisitors.toLocaleString()}</p>
                    <p className='text-[10px] text-on-surface-variant uppercase tracking-wide'>Visitors</p>
                  </div>
                  <div className='text-right'>
                    <p className='font-semibold text-on-surface text-sm'>{p.messages.toLocaleString()}</p>
                    <p className='text-[10px] text-on-surface-variant uppercase tracking-wide'>Messages</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPage;
