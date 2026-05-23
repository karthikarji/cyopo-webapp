import React from "react";
import { Download, MapPin, Globe } from "lucide-react";
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

const GitHubIcon = () => (
  <svg viewBox='0 0 24 24' width='14' height='14' fill='currentColor'>
    <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
  </svg>
);

interface Props {
  portfolio: Portfolio;
}

const MLTHero: React.FC<Props> = ({ portfolio }) => {
  const { profile, hasResume, id } = portfolio;
  const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";

  return (
    <section className='min-h-screen pt-16 flex items-center bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='max-w-6xl mx-auto px-6 py-20 w-full'>
        <div className='flex flex-col lg:flex-row items-center lg:items-start justify-between gap-12'>
          {/* Left — text */}
          <div className='flex-1 max-w-2xl'>
            {/* Availability badge */}
            <div className='inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full text-xs font-medium text-green-700 mb-6'>
              <span className='w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse' />
              Available for New Projects
            </div>

            <h1 className='text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.05] mb-4'>{profile?.name}</h1>

            {profile?.title && <p className='text-2xl sm:text-3xl text-gray-400 font-light mb-6'>{profile.title}</p>}

            {profile?.bio && (
              <p className='text-gray-500 text-base leading-relaxed mb-8 max-w-lg'>
                {profile.bio.length > 180 ? profile.bio.slice(0, 180) + "..." : profile.bio}
              </p>
            )}

            {/* Meta */}
            <div className='flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8'>
              {profile?.location && (
                <span className='flex items-center gap-1.5'>
                  <MapPin size={13} />
                  {profile.location}
                </span>
              )}
              {profile?.website && (
                <a
                  href={profile.website}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1.5 hover:text-gray-700 transition-colors'>
                  <Globe size={13} />
                  {profile.website.replace(/^https?:\/\//, "")}
                </a>
              )}
            </div>

            {/* CTAs — primary uses --tp */}
            <div className='flex flex-wrap items-center gap-3 mb-8'>
              {hasResume && (
                <a
                  href={`${BASE_URL}/api/v1/public/portfolios/${id}/resume`}
                  download
                  style={{ background: "var(--tp)" }}
                  className='inline-flex items-center gap-2 px-5 py-2.5 text-white text-sm font-medium rounded-xl hover:opacity-90 transition-opacity shadow-sm'>
                  <Download size={14} />
                  Download Resume
                </a>
              )}
              {portfolio.settings?.showContactInfo && (
                <a
                  href='#contact'
                  className='inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-50 transition-colors'>
                  Contact Me
                </a>
              )}
            </div>

            {/* Social links — hover uses --tp */}
            <div className='flex items-center gap-2'>
              {profile?.socialMedia?.map((link, i) => (
                <a
                  key={i}
                  href={link.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  title={link.platform}
                  className='w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center transition-all duration-200 text-gray-500 hover:text-white'
                  onMouseEnter={(e) => (e.currentTarget.style.background = "var(--tp)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "")}>
                  {link.platform === "GitHub" ? (
                    <GitHubIcon />
                  ) : (
                    <span className='material-symbols-outlined text-[16px]'>{SOCIAL_ICONS[link.platform] ?? "link"}</span>
                  )}
                </a>
              ))}
            </div>
          </div>

          {/* Right — photo, decorative bg uses --ts */}
          <div className='flex-shrink-0'>
            <div className='relative'>
              <div
                className='absolute inset-0 rounded-3xl rotate-3 scale-105 opacity-30'
                style={{ background: "linear-gradient(to bottom right, var(--ts), var(--tp))" }}
              />
              <div className='relative w-64 h-64 lg:w-80 lg:h-80 rounded-3xl overflow-hidden shadow-2xl'>
                {profile?.profilePhoto ? (
                  <img src={profile.profilePhoto} alt={profile?.name} className='w-full h-full object-cover' />
                ) : (
                  <div
                    className='w-full h-full flex items-center justify-center text-white text-7xl font-bold'
                    style={{ background: "linear-gradient(to bottom right, var(--ts), var(--tp))" }}>
                    {profile?.name?.[0]?.toUpperCase() ?? "?"}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MLTHero;
