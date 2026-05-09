import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SIDEBAR_NAV_ITEMS } from "../sidebar/Sidebar.constants";

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface border-t border-outline-variant/20 flex items-center justify-around h-16 px-2'>
      {SIDEBAR_NAV_ITEMS.map((item) => {
        const active = location.pathname === item.route;
        return (
          <button
            key={item.route}
            onClick={() => navigate(item.route)}
            className={[
              "flex flex-col items-center gap-0.5 flex-1 py-2 rounded-xl transition-colors",
              active ? "text-primary" : "text-on-surface-variant",
            ].join(" ")}>
            <span
              className='material-symbols-outlined text-[22px]'
              style={{
                fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
              }}>
              {item.icon}
            </span>
            <span className='text-[10px] font-medium'>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
