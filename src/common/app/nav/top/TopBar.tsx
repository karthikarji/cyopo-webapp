import React from "react";
import { Plus, Zap } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import UserPersona from "./persona/UserPersona";
import useTopBar from "./useTopBar";
import { TOPBAR_NEW_PORTFOLIO_LABEL } from "./TopBar.constants";

const TopBar: React.FC = () => {
  const { state, handlers } = useTopBar();

  return (
    <header
      className={[
        "fixed top-0 right-0 z-30 h-16",
        "left-0 md:left-[56px]",
        "bg-surface-container-low dark:bg-surface-container",
        "border-b border-outline-variant/30",
        "shadow-sm",
        "flex items-center justify-between",
        "px-4 sm:px-6",
        "transition-all duration-300",
      ].join(" ")}>
      {/* Breadcrumb */}
      <div className='flex items-center gap-2'>
        <span className='font-headline font-bold text-on-surface text-base'>{state.currentLabel}</span>
      </div>

      {/* Right actions */}
      <div className='flex items-center gap-2 sm:gap-3'>
        {/* Upgrade chip — only for FREE users */}
        {state.isFreePlan && (
          <button
            onClick={handlers.handleUpgrade}
            className={[
              "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full",
              "text-xs font-bold transition-all duration-200",
              "bg-primary-container text-on-primary-container",
              "hover:bg-primary hover:text-on-primary",
              "border border-primary/20",
            ].join(" ")}>
            <Zap size={12} />
            Upgrade
          </button>
        )}

        {/* Theme toggle */}
        <button
          onClick={handlers.handleThemeToggle}
          className='w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors'
          aria-label='Toggle theme'>
          <span className='material-symbols-outlined text-[20px]'>{state.isDark ? "light_mode" : "dark_mode"}</span>
        </button>

        {/* New portfolio button */}
        <Button variant='primary' size='sm' leftIcon={<Plus size={15} />} onClick={handlers.handleNewPortfolio} className='shadow-sm'>
          <span className='hidden sm:inline'>{TOPBAR_NEW_PORTFOLIO_LABEL}</span>
          <span className='sm:hidden'>New</span>
        </Button>

        {/* User persona */}
        <UserPersona />
      </div>
    </header>
  );
};

export default TopBar;
