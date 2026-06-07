import React from "react";
import useAdminBillingStats from "../controller/useAdminBillingStats";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: string;
  color?: string;
  sub?: string;
}

const StatCard: React.FC<StatCardProps> = ({ label, value, icon, color = "text-primary", sub }) => (
  <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5 flex flex-col gap-3'>
    <div className='flex items-center justify-between'>
      <span className='text-xs font-semibold text-on-surface-variant uppercase tracking-wide'>{label}</span>
      <span className={`material-symbols-outlined text-[20px] ${color}`} style={{ fontVariationSettings: "'FILL' 1" }}>
        {icon}
      </span>
    </div>
    <p className={`font-headline font-black text-2xl text-on-surface`}>{value}</p>
    {sub && <p className='text-xs text-on-surface-variant'>{sub}</p>}
  </div>
);

const AdminBillingStats: React.FC = () => {
  const { state, handlers } = useAdminBillingStats();

  if (state.isLoading) {
    return (
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className='bg-surface border border-outline-variant/20 rounded-2xl p-5 animate-pulse h-28' />
        ))}
      </div>
    );
  }

  if (!state.stats) return null;

  const s = state.stats;
  const fmt = (n: number) => handlers.formatAmount(n, s.currency);

  return (
    <div className='flex flex-col gap-6'>
      {/* Revenue */}
      <div>
        <p className='text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-3'>Revenue</p>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          <StatCard label='All Time Revenue' value={fmt(s.totalRevenueAllTime)} icon='attach_money' color='text-success' />
          <StatCard label='This Month' value={fmt(s.totalRevenueThisMonth)} icon='trending_up' color='text-success' />
          <StatCard label='Payments This Month' value={s.totalPaymentsThisMonth} icon='payments' />
          <StatCard label='Refunds This Month' value={s.refundsThisMonth} icon='currency_exchange' color='text-warning' />
        </div>
      </div>

      {/* Subscriptions */}
      <div>
        <p className='text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-3'>Subscriptions</p>
        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
          <StatCard label='Active' value={s.activeSubscriptions} icon='check_circle' color='text-success' />
          <StatCard label='Past Due' value={s.pastDueSubscriptions} icon='warning' color='text-warning' />
          <StatCard label='Cancelled This Month' value={s.cancelledThisMonth} icon='cancel' color='text-error' />
          <StatCard label='Failed Payments' value={s.failedPaymentsThisMonth} icon='error' color='text-error' />
        </div>
      </div>

      {/* Users by plan */}
      <div>
        <p className='text-xs font-semibold text-on-surface-variant uppercase tracking-widest mb-3'>Users by Plan</p>
        <div className='grid grid-cols-3 gap-4'>
          <StatCard label='Free' value={s.freeUsers} icon='person' color='text-on-surface-variant' sub='Free plan users' />
          <StatCard label='Premium' value={s.premiumUsers} icon='workspace_premium' color='text-primary' sub='Premium plan users' />
          <StatCard label='Pro' value={s.proUsers} icon='diamond' color='text-tertiary' sub='Pro plan users' />
        </div>
      </div>

      {/* Webhooks */}
      {s.unprocessedWebhooks > 0 && (
        <div className='flex items-center gap-3 bg-warning-container rounded-xl p-4'>
          <span className='material-symbols-outlined text-warning' style={{ fontVariationSettings: "'FILL' 1" }}>
            warning
          </span>
          <p className='text-sm text-on-warning-container font-medium'>
            {s.unprocessedWebhooks} unprocessed webhook event(s) — check the Webhooks tab.
          </p>
        </div>
      )}
    </div>
  );
};

export default AdminBillingStats;
