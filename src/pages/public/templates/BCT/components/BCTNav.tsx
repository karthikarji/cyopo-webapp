import React, { useEffect, useState } from "react";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";

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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-sm" : "bg-transparent",
      ].join(" ")}>
      <div className='max-w-7xl mx-auto px-6 h-14 flex items-center justify-between'>
        <span className='text-xs font-bold tracking-[0.3em] uppercase text-white'>{portfolio.profile?.name?.split(" ")[0] ?? "Portfolio"}</span>
        <div className='flex items-center gap-8'>
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className='text-[10px] font-medium tracking-[0.2em] uppercase text-white/40 hover:text-white transition-colors'>
              {item.label}
            </a>
          ))}
          {portfolio.settings?.showContactInfo && (
            <a
              href='#contact'
              className='px-4 py-1.5 bg-[#e63329] text-white text-xs font-bold tracking-widest uppercase rounded hover:bg-[#c02820] transition-colors'>
              Hire Me
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default BCTNav;
