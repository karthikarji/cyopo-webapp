import React from "react";
import { Eye, Users, TrendingUp, MessageSquare } from "lucide-react";
import type { AnalyticsData } from "@cyopo/Services/api/analytics/AnalyticsAPIService";

interface Props {
  data: AnalyticsData;
}

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  sub?: string;
}

const StatCard: React.FC<StatCardProps> = ({ icon, label, value, sub }) => (
  <div className='bg-surface border border-outline-variant/20 rounded-2xl p-5'>
    <div className='flex items-center gap-3 mb-3'>
      <div className='w-9 h-9 rounded-xl bg-secondary-container flex items-center justify-center flex-shrink-0'>{icon}</div>
      <p className='text-sm text-on-surface-variant'>{label}</p>
    </div>
    <p className='font-headline font-bold text-on-surface text-2xl sm:text-3xl'>{value.toLocaleString()}</p>
    {sub && <p className='text-xs text-on-surface-variant mt-1'>{sub}</p>}
  </div>
);

const AnalyticsStats: React.FC<Props> = ({ data }) => (
  <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
    <StatCard icon={<Eye size={16} className='text-primary' />} label='Total Views' value={data.totalViews} sub='All time' />
    <StatCard icon={<Users size={16} className='text-primary' />} label='Unique Visitors' value={data.uniqueVisitors} sub='All time' />
    <StatCard
      icon={<TrendingUp size={16} className='text-primary' />}
      label='This Month'
      value={data.viewsThisMonth}
      sub={`${data.viewsThisWeek.toLocaleString()} this week`}
    />
    <StatCard icon={<MessageSquare size={16} className='text-primary' />} label='Messages' value={data.totalMessages} sub='Total received' />
  </div>
);

export default AnalyticsStats;
