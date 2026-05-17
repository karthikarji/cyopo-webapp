import React from "react";

export interface Tab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (id: string) => void;
  size?: "sm" | "md";
  fullWidth?: boolean;
}

const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeTab, onChange, size = "md", fullWidth = false }) => {
  const paddingCls = size === "sm" ? "px-3 py-1.5" : "px-4 py-2";
  const textCls = size === "sm" ? "text-xs" : "text-sm";

  return (
    <div className={["flex gap-1 bg-surface-container rounded-xl p-1", fullWidth ? "w-full" : "w-fit"].join(" ")}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={[
              "flex items-center justify-center gap-1.5 rounded-lg font-medium transition-all duration-200",
              paddingCls,
              textCls,
              fullWidth ? "flex-1" : "",
              isActive ? "bg-surface text-on-surface shadow-sm" : "text-on-surface-variant hover:text-on-surface",
            ].join(" ")}>
            {tab.icon && <span className='flex-shrink-0'>{tab.icon}</span>}
            {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span
                className={[
                  "flex items-center justify-center rounded-full font-bold",
                  "bg-primary text-on-primary",
                  size === "sm" ? "text-[9px] w-4 h-4" : "text-[10px] w-4 h-4",
                ].join(" ")}>
                {tab.badge > 99 ? "99+" : tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default TabSwitcher;
