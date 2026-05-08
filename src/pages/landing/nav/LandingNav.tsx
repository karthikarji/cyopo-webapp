import React from "react";
import { Menu, X } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import useLandingNav from "./useLandingNav";
import { NAV_LINKS } from "./LandingNav.constants";

const LandingNav: React.FC = () => {
  const { state, handlers } = useLandingNav();

  return (
    <>
      <header
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          state.isScrolled ? "bg-surface/80 dark:bg-surface-dim/80 backdrop-blur-md shadow-sm border-b border-outline-variant/20" : "bg-transparent",
        ].join(" ")}>
        <div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16'>
            {/* Logo */}
            <button
              onClick={handlers.handleLogoClick}
              className='flex items-center gap-2 font-headline font-bold text-xl text-primary dark:text-inverse-primary'>
              <span className='material-symbols-outlined text-2xl' style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              cyopo
            </button>

            {/* Desktop nav links */}
            <nav className='hidden md:flex items-center gap-8'>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handlers.handleNavLink(link.href)}
                  className='text-sm font-medium text-on-surface-variant hover:text-primary transition-colors'>
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className='hidden md:flex items-center gap-3'>
              {state.isAuthenticated ? (
                <Button variant='primary' size='sm' onClick={handlers.handleDashboardClick}>
                  Go to dashboard
                </Button>
              ) : (
                <>
                  <Button variant='ghost' size='sm' onClick={handlers.handleLoginClick}>
                    Log in
                  </Button>
                  <Button variant='primary' size='sm' onClick={handlers.handleRegisterClick}>
                    Get started
                  </Button>
                </>
              )}
            </div>

            {/* Mobile hamburger */}
            <button
              className='md:hidden p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors'
              onClick={handlers.handleMobileToggle}
              aria-label='Toggle menu'>
              {state.isMobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      {state.isMobileOpen && (
        <div className='fixed inset-0 z-40 md:hidden'>
          <div className='absolute inset-0 bg-black/40 backdrop-blur-sm' onClick={handlers.handleMobileClose} />
          <div className='absolute top-0 right-0 bottom-0 w-72 bg-surface dark:bg-surface-dim shadow-xl flex flex-col'>
            {/* Drawer header */}
            <div className='flex items-center justify-between px-6 h-16 border-b border-outline-variant/20'>
              <span className='font-headline font-bold text-lg text-primary'>cyopo</span>
              <button
                className='p-2 rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors'
                onClick={handlers.handleMobileClose}>
                <X size={20} />
              </button>
            </div>

            {/* Drawer links */}
            <nav className='flex flex-col px-4 py-6 gap-1 flex-1'>
              {NAV_LINKS.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handlers.handleNavLink(link.href)}
                  className='text-left px-4 py-3 rounded-xl text-sm font-medium text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors'>
                  {link.label}
                </button>
              ))}
            </nav>

            {/* Drawer CTA */}
            <div className='px-6 pb-8 flex flex-col gap-3'>
              {state.isAuthenticated ? (
                <Button variant='primary' fullWidth onClick={handlers.handleDashboardClick}>
                  Go to dashboard
                </Button>
              ) : (
                <>
                  <Button variant='secondary' fullWidth onClick={handlers.handleLoginClick}>
                    Log in
                  </Button>
                  <Button variant='primary' fullWidth onClick={handlers.handleRegisterClick}>
                    Get started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LandingNav;
