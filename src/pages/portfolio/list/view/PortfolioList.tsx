import React from "react";
import { Plus } from "lucide-react";
import PortfolioCard from "./PortfolioCard";
import PortfolioEmptyState from "./PortfolioEmptyState";
import UpgradePromptModal from "@cyopo/Components/upgrade/UpgradePromptModal";
import usePortfolioList from "../controller/usePortfolioList";

const PortfolioCardSkeleton: React.FC = () => (
  <div className='bg-surface border border-outline-variant/30 rounded-2xl overflow-hidden animate-pulse'>
    <div className='h-36 bg-surface-container-high' />
    <div className='px-4 pt-3 pb-4 flex flex-col gap-2'>
      <div className='h-4 bg-surface-container-highest rounded w-3/4' />
      <div className='h-3 bg-surface-container-highest rounded w-1/2' />
      <div className='h-5 bg-surface-container-highest rounded-full w-20 mt-1' />
    </div>
  </div>
);

const PortfolioList: React.FC = () => {
  const { state, handlers } = usePortfolioList();

  return (
    <div>
      {/* Loading skeletons */}
      {state.isLoading && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <PortfolioCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!state.isLoading && state.isEmpty && <PortfolioEmptyState isFiltered={state.isFiltered} onCreateNew={handlers.handleCreateNew} />}

      {/* Portfolio grid */}
      {!state.isLoading && !state.isEmpty && (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {state.portfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              isMenuOpen={state.menuOpenId === portfolio.id}
              onMenuOpen={handlers.handleMenuOpen}
              onMenuClose={handlers.handleMenuClose}
              onAction={handlers.handleAction}
            />
          ))}

          {/* Create new card */}
          <button
            onClick={handlers.handleCreateNew}
            className={[
              "border-2 border-dashed border-outline-variant/40",
              "rounded-2xl min-h-[220px]",
              "flex flex-col items-center justify-center gap-3",
              "hover:border-primary/40 hover:bg-surface-container-low",
              "transition-all duration-200 cursor-pointer group",
            ].join(" ")}>
            <div className='w-12 h-12 rounded-xl bg-surface-container group-hover:bg-secondary-container flex items-center justify-center transition-colors'>
              <Plus size={22} className='text-on-surface-variant group-hover:text-primary transition-colors' />
            </div>
            <div className='text-center'>
              <p className='text-sm font-medium text-on-surface-variant group-hover:text-on-surface transition-colors'>New portfolio</p>
              <p className='text-xs text-on-surface-variant/70 mt-0.5'>Start from a template</p>
            </div>
          </button>
        </div>
      )}

      {/* Delete confirm dialog */}
      {state.deleteTargetId && (
        <div className='fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4'>
          <div className='bg-surface rounded-2xl shadow-xl w-full max-w-sm p-6'>
            <div className='w-12 h-12 rounded-xl bg-error-container flex items-center justify-center mb-4'>
              <span className='material-symbols-outlined text-error text-2xl'>delete</span>
            </div>
            <h3 className='font-headline font-bold text-on-surface text-lg mb-2'>Delete portfolio?</h3>
            <p className='text-sm text-on-surface-variant leading-relaxed mb-6'>
              This will permanently delete this portfolio and all its content. This action cannot be undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={handlers.handleDeleteCancel}
                className='flex-1 px-4 py-2.5 rounded-xl border border-outline-variant text-sm font-medium text-on-surface hover:bg-surface-container transition-colors'>
                Cancel
              </button>
              <button
                onClick={handlers.handleDeleteConfirm}
                disabled={state.isDeleting}
                className='flex-1 px-4 py-2.5 rounded-xl bg-error text-on-error text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50'>
                {state.isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Upgrade prompt modal ─────────────────────────────────── */}
      {state.upgradePrompt && (
        <UpgradePromptModal
          title={state.upgradePrompt.title}
          description={state.upgradePrompt.description}
          feature={state.upgradePrompt.feature}
          currentPlan={state.upgradePrompt.currentPlan}
          onUpgrade={handlers.handleUpgrade}
          onClose={handlers.hideUpgradePrompt}
        />
      )}
    </div>
  );
};

export default PortfolioList;
