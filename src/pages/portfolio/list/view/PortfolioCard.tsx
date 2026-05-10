import React from "react";
import { ExternalLink } from "lucide-react";
import PortfolioStatusBadge from "../../common/components/PortfolioStatusBadge";
import { PORTFOLIO_ACTIONS } from "../PortfolioList.constants";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";
import type { PortfolioActionItem } from "../PortfolioList.model.d";

interface Props {
  portfolio: Portfolio;
  isMenuOpen: boolean;
  onMenuOpen: (id: string) => void;
  onMenuClose: () => void;
  onAction: (action: string, portfolio: Portfolio) => void;
}

const PortfolioCard: React.FC<Props> = ({ portfolio, isMenuOpen, onMenuOpen, onMenuClose, onAction }) => {
  const updatedAt = new Date(portfolio.updatedAt);
  const daysAgo = Math.floor((Date.now() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));
  const timeLabel = daysAgo === 0 ? "Today" : daysAgo === 1 ? "Yesterday" : `${daysAgo}d ago`;

  // Filter actions based on portfolio status — uppercase to match API
  const availableActions = PORTFOLIO_ACTIONS.filter((a) => {
    if (a.action === "publish" && portfolio.status === "PUBLISHED") return false;
    if (a.action === "archive" && portfolio.status === "ARCHIVED") return false;
    if (a.action === "view" && portfolio.status !== "PUBLISHED") return false;
    return true;
  });

  return (
    <div
      className={[
        "group bg-surface border border-outline-variant/30",
        "rounded-2xl shadow-sm relative",
        "hover:shadow-md hover:border-primary/20",
        "transition-all duration-200",
        "flex flex-col",
      ].join(" ")}>
      {/* Thumbnail — overflow hidden scoped here only */}
      <div className='h-36 relative overflow-hidden bg-surface-container rounded-t-2xl cursor-pointer' onClick={() => onAction("edit", portfolio)}>
        {/* Template color preview */}
        <div
          className='w-full h-full flex flex-col p-3 gap-2'
          style={{
            background: "linear-gradient(135deg, var(--color-surface-container-low), var(--color-surface-container))",
          }}>
          <div className='flex items-center gap-2'>
            <div className='w-6 h-6 rounded-full bg-primary/30 flex-shrink-0' />
            <div className='flex flex-col gap-1 flex-1'>
              <div className='h-2 rounded bg-on-surface/10 w-3/4' />
              <div className='h-1.5 rounded bg-on-surface/5 w-1/2' />
            </div>
          </div>
          <div className='flex gap-2 flex-1'>
            <div className='flex-1 rounded-lg bg-on-surface/5' />
            <div className='flex-1 rounded-lg bg-on-surface/5' />
          </div>
        </div>

        {/* Hover overlay */}
        <div className='absolute inset-0 bg-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center'>
          <span className='bg-surface text-on-surface px-4 py-1.5 rounded-full text-xs font-bold shadow-md'>Edit portfolio</span>
        </div>

        {/* View live badge — only for published */}
        {portfolio.status === "PUBLISHED" && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction("view", portfolio);
            }}
            className='absolute top-2 right-2 bg-surface/90 backdrop-blur-sm text-on-surface px-2 py-1 rounded-lg text-xs font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200'>
            <ExternalLink size={11} />
            Live
          </button>
        )}
      </div>

      {/* Card body */}
      <div className='px-4 pt-3 pb-2 flex-1'>
        <div className='flex items-start justify-between gap-2 mb-1'>
          <h3
            className='font-headline font-bold text-on-surface text-sm leading-tight cursor-pointer hover:text-primary transition-colors truncate'
            onClick={() => onAction("edit", portfolio)}>
            {portfolio.name}
          </h3>

          {/* Three dot menu */}
          <div className='relative flex-shrink-0'>
            <button
              onClick={(e) => {
                e.stopPropagation();
                isMenuOpen ? onMenuClose() : onMenuOpen(portfolio.id);
              }}
              className='w-7 h-7 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors'>
              <span className='material-symbols-outlined text-[18px]'>more_vert</span>
            </button>

            {/* Dropdown — renders above everything */}
            {isMenuOpen && (
              <>
                <div className='fixed inset-0 z-40' onClick={onMenuClose} />
                <div className='absolute right-0 top-8 w-44 z-50 bg-surface border border-outline-variant/30 rounded-xl shadow-xl overflow-hidden'>
                  {availableActions.map((action: PortfolioActionItem) => (
                    <button
                      key={action.action}
                      onClick={(e) => {
                        e.stopPropagation();
                        onAction(action.action, portfolio);
                        onMenuClose();
                      }}
                      className={[
                        "w-full flex items-center gap-2.5 px-3 py-2.5 text-sm",
                        "transition-colors duration-150",
                        action.danger
                          ? "text-error hover:bg-error-container"
                          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
                      ].join(" ")}>
                      <span className='material-symbols-outlined text-[16px]'>{action.icon}</span>
                      {action.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <p className='text-xs text-on-surface-variant truncate mb-2'>cyopo.com/{portfolio.slug}</p>

        <div className='flex items-center justify-between'>
          <PortfolioStatusBadge status={portfolio.status} />
          <span className='text-xs text-on-surface-variant'>{timeLabel}</span>
        </div>
      </div>

      {/* Card footer */}
      <div className='px-4 py-2 border-t border-outline-variant/20 flex items-center gap-1'>
        <button
          onClick={() => onAction("edit", portfolio)}
          className='flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors'>
          <span className='material-symbols-outlined text-[14px]'>edit</span>
          Edit
        </button>
        <button
          onClick={() => onAction("duplicate", portfolio)}
          className='flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors'>
          <span className='material-symbols-outlined text-[14px]'>content_copy</span>
          Duplicate
        </button>
        {portfolio.status === "PUBLISHED" && (
          <button
            onClick={() => onAction("view", portfolio)}
            className='flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-xs text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors ml-auto'>
            <span className='material-symbols-outlined text-[14px]'>open_in_new</span>
            View live
          </button>
        )}
      </div>
    </div>
  );
};

export default PortfolioCard;
