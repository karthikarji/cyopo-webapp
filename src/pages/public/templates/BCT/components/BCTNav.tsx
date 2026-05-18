import React, { useEffect, useState } from "react";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";
import { X, Menu } from "lucide-react";

interface Props {
  portfolio: Portfolio;
}

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const BCTNav: React.FC<Props> = ({ portfolio }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleNavClick = () => setMenuOpen(false);

  return (
    <>
      <nav
        className={[
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled || menuOpen ? "bg-[#0a0a0a]/95 backdrop-blur-sm" : "bg-transparent",
        ].join(" ")}>
        <div className='max-w-7xl mx-auto px-6 h-14 flex items-center justify-between'>
          {/* Logo — first name */}
          <span className='text-xs font-bold tracking-[0.3em] uppercase text-white'>{portfolio.profile?.name?.split(" ")[0] ?? "Portfolio"}</span>

          {/* Desktop nav */}
          <div className='hidden md:flex items-center gap-6'>
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className='text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors'>
                {item.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className='hidden md:flex items-center gap-4'>
            {portfolio.settings?.showContactInfo && (
              <a
                href='#contact'
                className='px-4 py-1.5 bg-[#e63329] text-white text-xs font-bold tracking-widest uppercase rounded hover:bg-[#c02820] transition-colors'>
                Hire Me
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className='md:hidden w-8 h-8 flex items-center justify-center text-white/60 hover:text-white transition-colors'
            aria-label='Toggle menu'>
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Mobile menu — dropdown */}
        {menuOpen && (
          <div className='md:hidden bg-[#0a0a0a] border-t border-white/5 px-6 py-6 flex flex-col gap-5'>
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className='text-sm font-bold tracking-[0.2em] uppercase text-white/50 hover:text-white transition-colors'>
                {item.label}
              </a>
            ))}
            {portfolio.settings?.showContactInfo && (
              <a
                href='#contact'
                onClick={handleNavClick}
                className='mt-2 px-4 py-3 bg-[#e63329] text-white text-xs font-bold tracking-widest uppercase text-center hover:bg-[#c02820] transition-colors'>
                Hire Me
              </a>
            )}
          </div>
        )}
      </nav>

      {/* Backdrop — closes menu on outside click */}
      {menuOpen && <div className='fixed inset-0 z-40 md:hidden' onClick={() => setMenuOpen(false)} />}
    </>
  );
};

export default BCTNav;
