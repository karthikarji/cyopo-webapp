import React from "react";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";

const SOCIAL_ICONS: Record<string, string> = {
  GitHub: "code",
  LinkedIn: "work",
  Twitter: "alternate_email",
  Instagram: "photo_camera",
  Dribbble: "palette",
  Behance: "brush",
};

interface Props {
  portfolio: Portfolio;
}

const BCTFooter: React.FC<Props> = ({ portfolio }) => {
  const { profile } = portfolio;
  const year = new Date().getFullYear();

  return (
    <footer className='bg-[#0a0a0a] border-t border-white/5 py-8 px-6'>
      <div className='max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div>
          <p className='font-black uppercase text-white tracking-widest text-sm'>{profile?.name ?? "Portfolio"}</p>
          <p className='text-[10px] text-white/20 mt-0.5 tracking-widest uppercase'>
            © {year} · Built with {/* cyopo link hover uses var(--tp) */}
            <a
              href='https://cyopo.com'
              target='_blank'
              rel='noopener noreferrer'
              className='text-white/30 transition-colors duration-200'
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--tp)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}>
              cyopo
            </a>
          </p>
        </div>

        {profile?.socialMedia && profile.socialMedia.length > 0 && (
          <div className='flex items-center gap-4'>
            {profile.socialMedia.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                title={link.platform}
                className='w-8 h-8 border border-white/10 flex items-center justify-center text-white/30 hover:text-white hover:border-white/40 transition-all'>
                <span className='material-symbols-outlined text-[14px]'>{SOCIAL_ICONS[link.platform] ?? "link"}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default BCTFooter;
