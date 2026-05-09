import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@cyopo/Hooks/useRedux";
import { selectUser } from "@cyopo/Redux/selectors/AppCommon.selector";
import { SIDEBAR_NAV_ITEMS, SIDEBAR_ADMIN_ITEMS } from "../sidebar/Sidebar.constants";

const MobileBottomNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const isAdmin = user?.role === "ADMIN";

  const navItems = isAdmin ? [...SIDEBAR_NAV_ITEMS, ...SIDEBAR_ADMIN_ITEMS] : SIDEBAR_NAV_ITEMS;

  return (
    <nav className='fixed bottom-0 left-0 right-0 z-40 md:hidden bg-surface border-t border-outline-variant/20 flex items-center justify-around h-16 px-2 overflow-x-auto'>
      {navItems.map((item) => {
        const active = location.pathname === item.route;
        return (
          <button
            key={item.route}
            onClick={() => navigate(item.route)}
            className={[
              "flex flex-col items-center gap-0.5 flex-shrink-0 px-2 py-2 rounded-xl transition-colors min-w-[56px]",
              active ? "text-primary" : "text-on-surface-variant",
            ].join(" ")}>
            <span
              className='material-symbols-outlined text-[22px]'
              style={{
                fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
              }}>
              {item.icon}
            </span>
            <span className='text-[10px] font-medium whitespace-nowrap'>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
