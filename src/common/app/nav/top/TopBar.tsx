import React from "react";
import { Plus } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import UserPersona from "./persona/UserPersona";
import useTopBar from "./useTopBar";
import { TOPBAR_NEW_PORTFOLIO_LABEL } from "./TopBar.constants";

const TopBar: React.FC = () => {
  const { state, handlers } = useTopBar();

  return (
    <header
      className={[
        "fixed top-0 right-0 left-[56px] z-30 h-16",
        "bg-surface dark:bg-surface-dim",
        "border-b border-outline-variant/10 shadow-sm",
        "flex items-center justify-between",
        "px-6",
        "transition-all duration-300",
      ].join(" ")}>
      {/* Breadcrumb */}
      <div className='flex items-center gap-2'>
        <span className='font-headline font-bold text-on-surface text-base'>{state.currentLabel}</span>
      </div>

      {/* Right actions */}
      <div className='flex items-center gap-3'>
        {/* Theme toggle */}
        <button
          onClick={handlers.handleThemeToggle}
          className='w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors'
          aria-label='Toggle theme'>
          <span className='material-symbols-outlined text-[20px]'>{state.isDark ? "light_mode" : "dark_mode"}</span>
        </button>

        {/* New portfolio button */}
        <Button variant='primary' size='sm' leftIcon={<Plus size={15} />} onClick={handlers.handleNewPortfolio}>
          {TOPBAR_NEW_PORTFOLIO_LABEL}
        </Button>

        {/* User persona */}
        <UserPersona />
      </div>
    </header>
  );
};

export default TopBar;
