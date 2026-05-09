import React from "react";
import DashboardGreeting from "./greeting/view/DashboardGreeting";
import DashboardStats from "./stats/view/DashboardStats";

const DashboardPage: React.FC = () => {
  return (
    <div>
      <DashboardGreeting />
      <DashboardStats />
      {/* Recent portfolios + chart coming in PR #7 */}
    </div>
  );
};

export default DashboardPage;
