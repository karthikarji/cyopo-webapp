import React from "react";
import useFooter from "../useFooter";
import { FOOTER_TAGLINE, FOOTER_COPYRIGHT, FOOTER_LINKS, FOOTER_SOCIAL_LINKS } from "../Footer.constants";

const SOCIAL_ICONS: Record<string, string> = {
  twitter: "flutter_dash",
  github: "code",
  linkedin: "work",
};

const Footer: React.FC = () => {
  const { handlers } = useFooter();

  return (
    <footer className='bg-surface-container-lowest dark:bg-surface-container-high border-t border-outline-variant/20'>
      {/* Main footer content */}
      <div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16'>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-12'>
          {/* Brand column */}
          <div className='col-span-2 sm:col-span-3 lg:col-span-1'>
            {/* Logo */}
            <div className='flex items-center gap-2 font-headline font-bold text-xl text-primary dark:text-inverse-primary mb-3'>
              <span className='material-symbols-outlined text-2xl' style={{ fontVariationSettings: "'FILL' 1" }}>
                auto_awesome
              </span>
              cyopo
            </div>

            {/* Tagline */}
            <p className='text-sm text-on-surface-variant leading-relaxed mb-6 max-w-xs'>{FOOTER_TAGLINE}</p>

            {/* Social links */}
            <div className='flex items-center gap-3'>
              {FOOTER_SOCIAL_LINKS.map((socialLink) => (
                <a
                  key={socialLink.label}
                  href={socialLink.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={socialLink.label}
                  className={[
                    "w-9 h-9 rounded-lg",
                    "bg-surface-container flex items-center justify-center",
                    "text-on-surface-variant hover:text-primary",
                    "hover:bg-secondary-container",
                    "transition-colors duration-200",
                  ].join(" ")}>
                  <span className='material-symbols-outlined text-lg'>{SOCIAL_ICONS[socialLink.label]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.title}>
              <h4 className='font-label font-semibold text-on-surface text-sm mb-4 tracking-wide'>{group.title}</h4>
              <ul className='flex flex-col gap-3'>
                {group.links.map((footerLink) => (
                  <li key={footerLink.label}>
                    <button
                      onClick={() => handlers.handleSectionLink(footerLink.href)}
                      className='text-sm text-on-surface-variant hover:text-primary transition-colors duration-200 text-left'>
                      {footerLink.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t border-outline-variant/20'>
        <div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3'>
          <p className='text-xs text-on-surface-variant'>{FOOTER_COPYRIGHT}</p>
          <p className='text-xs text-on-surface-variant'>
            Made with <span className='text-primary'>♥</span> for creators everywhere
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
