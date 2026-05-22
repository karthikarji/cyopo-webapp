import React from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import TabSwitcher from "@cyopo/Components/tab-switcher/TabSwitcher";
import type { ChartPoint, Interval } from "../controller/useAnalyticsChart";

interface Props {
  chartData: ChartPoint[];
  interval: Interval;
  onIntervalChange: (val: string) => void;
}

const INTERVAL_TABS = [
  { id: "day", label: "Daily" },
  { id: "week", label: "Weekly" },
  { id: "month", label: "Monthly" },
  { id: "year", label: "Yearly" },
];

const AnalyticsChart: React.FC<Props> = ({ chartData, interval, onIntervalChange }) => (
  <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5'>
    {/* Chart header */}
    <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6'>
      <h2 className='font-semibold text-on-surface'>Views Over Time</h2>
      <TabSwitcher tabs={INTERVAL_TABS} activeTab={interval} onChange={onIntervalChange} size='sm' />
    </div>

    {/* Empty state */}
    {chartData.length === 0 ? (
      <div className='flex flex-col items-center justify-center py-16 text-center'>
        <span className='material-symbols-outlined text-4xl text-on-surface-variant/30 mb-3'>bar_chart</span>
        <p className='text-sm text-on-surface-variant'>No view data yet</p>
        <p className='text-xs text-on-surface-variant/60 mt-1'>Share your portfolio to start getting views</p>
      </div>
    ) : (
      <ResponsiveContainer width='100%' height={240}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id='viewsGrad' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='var(--color-primary)' stopOpacity={0.15} />
              <stop offset='95%' stopColor='var(--color-primary)' stopOpacity={0} />
            </linearGradient>
            <linearGradient id='visitorsGrad' x1='0' y1='0' x2='0' y2='1'>
              <stop offset='5%' stopColor='var(--color-secondary)' stopOpacity={0.15} />
              <stop offset='95%' stopColor='var(--color-secondary)' stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray='3 3' stroke='var(--color-outline-variant)' strokeOpacity={0.3} />
          <XAxis dataKey='date' tick={{ fontSize: 11, fill: "var(--color-on-surface-variant)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "var(--color-on-surface-variant)" }} axisLine={false} tickLine={false} allowDecimals={false} />
          <Tooltip
            contentStyle={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-outline-variant)",
              borderRadius: "12px",
              fontSize: "12px",
              color: "var(--color-on-surface)",
            }}
          />
          <Area type='monotone' dataKey='views' name='Views' stroke='var(--color-primary)' strokeWidth={2} fill='url(#viewsGrad)' />
          <Area type='monotone' dataKey='visitors' name='Unique Visitors' stroke='var(--color-secondary)' strokeWidth={2} fill='url(#visitorsGrad)' />
        </AreaChart>
      </ResponsiveContainer>
    )}
  </div>
);

export default AnalyticsChart;
