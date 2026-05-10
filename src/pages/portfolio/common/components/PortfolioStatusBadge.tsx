import React from "react";
import type { PortfolioStatus } from "@cyopo/Models/portfolio/portfolio.model";

const STATUS_STYLES: Record<PortfolioStatus, { bg: string; text: string; dot: string; label: string }> = {
  PUBLISHED: {
    bg: "bg-success-container",
    text: "text-success",
    dot: "bg-success",
    label: "Published",
  },
  DRAFT: {
    bg: "bg-surface-container-high",
    text: "text-on-surface-variant",
    dot: "bg-on-surface-variant",
    label: "Draft",
  },
  ARCHIVED: {
    bg: "bg-warning-container",
    text: "text-warning",
    dot: "bg-warning",
    label: "Archived",
  },
};

interface Props {
  status: PortfolioStatus;
}

const PortfolioStatusBadge: React.FC<Props> = ({ status }) => {
  const config = STATUS_STYLES[status];
  return (
    <span className={["inline-flex items-center gap-1.5 px-2.5 py-1", "rounded-full text-xs font-medium", config.bg, config.text].join(" ")}>
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  );
};

export default PortfolioStatusBadge;
