import React, { useEffect, useState } from "react";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";
import { API } from "@cyopo/Constants/api/Api.constants";

interface Props {
  portfolio: Portfolio;
}

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const MLTNav: React.FC<Props> = ({ portfolio }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={[
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent",
      ].join(" ")}>
      <div className='max-w-6xl mx-auto px-6 h-16 flex items-center justify-between'>
        <span className='font-bold text-gray-900 text-lg'>{portfolio.profile?.name?.split(" ")[0] ?? "Portfolio"}</span>

        {/* Desktop nav */}
        <div className='hidden md:flex items-center gap-6'>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className='text-sm text-gray-500 hover:text-gray-900 transition-colors'>
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        {portfolio.settings?.showContactInfo && (
          <a href='#contact' className='px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors'>
            Hire Me
          </a>
        )}
      </div>
    </nav>
  );
};

export default MLTNav;
