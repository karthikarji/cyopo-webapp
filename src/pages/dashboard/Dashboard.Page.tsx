import React from "react";
import DashboardGreeting from "./greeting/view/DashboardGreeting";
import DashboardStats from "./stats/view/DashboardStats";
import DashboardChart from "./chart/view/DashboardChart";
import RecentPortfolios from "./recent/view/RecentPortfolios";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <DashboardGreeting />
      <DashboardStats />
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6'>
        <RecentPortfolios />
        <DashboardChart />
      </div>
    </div>
  );
};

export default DashboardPage;
