import React from "react";
import useSidebar from "./useSidebar";

const Sidebar: React.FC = () => {
  const { state, handlers } = useSidebar();

  return (
    <aside
      className={[
        "fixed left-0 top-0 h-full z-40",
        "flex flex-col py-4",
        "bg-surface-container-low border-r border-outline-variant/20",
        "shadow-sm",
        "w-[56px] hover:w-[220px]",
        "transition-all duration-300 ease-in-out",
        "overflow-hidden group",
        "hidden md:flex",
      ].join(" ")}>
      {/* Logo */}
      <div className='px-3 mb-8 flex items-center gap-3 flex-shrink-0'>
        <div
          className={[
            "min-w-[32px] h-[32px] rounded-lg flex items-center justify-center flex-shrink-0",
            "bg-primary-container dark:bg-primary-fixed-dim",
          ].join(" ")}>
          <span
            className='material-symbols-outlined text-on-primary-container dark:text-on-primary-fixed text-lg'
            style={{ fontVariationSettings: "'FILL' 1" }}>
            auto_awesome
          </span>
        </div>
        <span className='font-headline font-black text-primary text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
          cyopo
        </span>
      </div>

      {/* Nav items */}
      <nav className='flex-1 flex flex-col gap-1 px-2'>
        {state.navItems.map((item) => {
          const active = handlers.isActive(item.route);
          return (
            <button
              key={item.route}
              onClick={() => handlers.handleNav(item.route)}
              title={item.label}
              className={[
                "flex items-center h-12 rounded-xl w-full",
                "transition-all duration-200 active:scale-95",
                "text-left flex-shrink-0",
                active
                  ? "bg-secondary-container text-on-secondary-container"
                  : "text-on-surface-variant hover:bg-surface-variant/50 hover:text-on-surface",
              ].join(" ")}>
              <div className='min-w-[40px] flex items-center justify-center flex-shrink-0'>
                <span
                  className='material-symbols-outlined text-[22px]'
                  style={{
                    fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0",
                  }}>
                  {item.icon}
                </span>
              </div>
              <span className='font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
                {item.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Bottom spacer for top bar alignment */}
      <div className='px-2 mt-auto'>
        <div className='h-px bg-outline-variant/20 mb-3' />
        <div className='flex items-center h-10 rounded-xl px-1'>
          <div className='min-w-[40px] flex items-center justify-center'>
            <span className='material-symbols-outlined text-[22px] text-on-surface-variant'>keyboard_arrow_right</span>
          </div>
          <span className='font-medium text-xs text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap'>
            Expand sidebar
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
