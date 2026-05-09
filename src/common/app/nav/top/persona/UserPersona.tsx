import React from "react";
import useUserPersona from "./useUserPersona";
import PersonaMenu from "./menu/PersonaMenu";

const UserPersona: React.FC = () => {
  const { state, handlers } = useUserPersona();

  return (
    <div className='relative'>
      <button
        onClick={handlers.handleMenuToggle}
        className={[
          "w-9 h-9 rounded-full flex items-center justify-center",
          "bg-primary text-on-primary",
          "font-headline font-bold text-sm",
          "hover:opacity-90 transition-opacity",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        ].join(" ")}>
        {state.initials}
      </button>

      {state.isMenuOpen && (
        <PersonaMenu
          onItemClick={handlers.handleMenuItemClick}
          onClose={handlers.handleMenuClose}
          userName={state.user?.name ?? ""}
          userEmail={state.user?.email ?? ""}
          userPlan={state.user?.plan ?? "FREE"}
        />
      )}
    </div>
  );
};

export default UserPersona;
