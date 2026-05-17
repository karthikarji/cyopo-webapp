import React from "react";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";

const SOCIAL_ICONS: Record<string, string> = {
  GitHub: "code",
  LinkedIn: "work",
  Twitter: "alternate_email",
  Instagram: "photo_camera",
  YouTube: "play_circle",
  Dribbble: "palette",
  Behance: "brush",
};

interface Props {
  portfolio: Portfolio;
}

const MLTFooter: React.FC<Props> = ({ portfolio }) => {
  const { profile } = portfolio;
  const year = new Date().getFullYear();

  return (
    <footer className='border-t border-gray-100 py-8 bg-white'>
      <div className='max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
        <div>
          <p className='font-bold text-gray-900 text-sm'>{profile?.name ?? "Portfolio"}</p>
          <p className='text-xs text-gray-400 mt-0.5'>
            © {year} · Crafted with{" "}
            <a
              href='https://cyopo.com'
              target='_blank'
              rel='noopener noreferrer'
              className='font-medium text-gray-500 hover:text-gray-900 transition-colors'>
              cyopo
            </a>
          </p>
        </div>

        {profile?.socialMedia?.length > 0 && (
          <div className='flex items-center gap-3'>
            {profile.socialMedia.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target='_blank'
                rel='noopener noreferrer'
                title={link.platform}
                className='text-xs text-gray-400 hover:text-gray-900 transition-colors'>
                {link.platform}
              </a>
            ))}
          </div>
        )}
      </div>
    </footer>
  );
};

export default MLTFooter;
