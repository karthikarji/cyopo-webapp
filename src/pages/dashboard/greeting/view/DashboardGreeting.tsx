import React from "react";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectUser } from "@cyopo/Redux/selectors/AppCommon.selector";
import { getGreeting, GREETING_SUBTITLE } from "../DashboardGreeting.constants";

const DashboardGreeting: React.FC = () => {
  const user = useAppSelector(selectUser);
  const firstName = user?.name?.split(" ")[0] ?? "there";
  const greeting = getGreeting();

  return (
    <div className='mb-6'>
      <h1 className='font-headline font-bold text-on-surface text-2xl sm:text-3xl mb-1'>
        {greeting}, {firstName} 👋
      </h1>
      <p className='text-on-surface-variant text-sm sm:text-base'>{GREETING_SUBTITLE}</p>
    </div>
  );
};

export default DashboardGreeting;
