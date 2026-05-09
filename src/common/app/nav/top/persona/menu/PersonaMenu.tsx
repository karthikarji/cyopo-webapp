import React from "react";
import { PERSONA_MENU_ITEMS } from "./PersonaMenu.constants";
import type { PersonaMenuItem } from "../UserPersona.model.d";

interface Props {
  onItemClick: (route?: string, action?: string) => void;
  onClose: () => void;
  userName: string;
  userEmail: string;
  userPlan: string;
}

const PersonaMenu: React.FC<Props> = ({ onItemClick, onClose, userName, userEmail, userPlan }) => {
  return (
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 z-40' onClick={onClose} />

      {/* Menu */}
      <div className='absolute right-0 top-full mt-2 w-56 z-50 bg-surface border border-outline-variant/30 rounded-xl shadow-lg overflow-hidden'>
        {/* User info header */}
        <div className='px-4 py-3 border-b border-outline-variant/20'>
          <p className='font-medium text-sm text-on-surface truncate'>{userName}</p>
          <p className='text-xs text-on-surface-variant truncate'>{userEmail}</p>
          <span className='inline-block mt-1.5 text-xs px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-medium'>
            {userPlan}
          </span>
        </div>

        {/* Menu items */}
        <div className='py-1'>
          {PERSONA_MENU_ITEMS.map((item: PersonaMenuItem) => (
            <button
              key={item.label}
              onClick={() => onItemClick(item.route, item.action)}
              className={[
                "w-full flex items-center gap-3 px-4 py-2.5",
                "text-sm transition-colors duration-150",
                item.danger ? "text-error hover:bg-error-container" : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface",
              ].join(" ")}>
              <span className='material-symbols-outlined text-[18px]'>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default PersonaMenu;
