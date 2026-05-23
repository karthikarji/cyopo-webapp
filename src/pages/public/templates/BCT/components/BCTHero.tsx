import React from "react";
import { Download } from "lucide-react";
import type { Portfolio } from "@cyopo/Models/portfolio/portfolio.model";

interface Props {
  portfolio: Portfolio;
}

const BCTHero: React.FC<Props> = ({ portfolio }) => {
  const { profile, hasResume, id } = portfolio;
  const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8080";
  const nameParts = profile?.name?.split(" ") ?? ["Your", "Name"];

  return (
    <section className='relative min-h-screen bg-[#0a0a0a] overflow-hidden'>
      {/* Profile photo — right half */}
      <div className='absolute right-0 top-0 bottom-0 w-1/2'>
        {profile?.profilePhoto ? (
          <img src={profile.profilePhoto} alt={profile.name} className='w-full h-full object-cover object-top opacity-70' />
        ) : (
          <div className='w-full h-full bg-gradient-to-bl from-[#1a1a1a] to-[#0a0a0a]' />
        )}
        <div className='absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent' />
      </div>

      {/* Content */}
      <div className='relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20 min-h-screen flex flex-col justify-end'>
        <div className='max-w-2xl'>
          {/* Title — uses var(--tp) */}
          {profile?.title && (
            <p style={{ color: "var(--tp)" }} className='text-xs font-bold tracking-[0.4em] uppercase mb-6'>
              {profile.title}
            </p>
          )}

          {/* Name */}
          <h1 className='font-black uppercase leading-[0.9] mb-8' style={{ fontSize: "clamp(4rem, 12vw, 10rem)" }}>
            {nameParts.map((part, i) => (
              <span key={i} className='block text-white'>
                {part}
              </span>
            ))}
          </h1>

          {/* Meta */}
          <div className='flex flex-wrap items-center gap-6 mb-8 text-xs text-white/40 tracking-widest uppercase'>
            {profile?.location && <span>{profile.location}</span>}
            {profile?.website && (
              <a href={profile.website} target='_blank' rel='noopener noreferrer' className='hover:text-white transition-colors'>
                {profile.website.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>

          {/* CTAs */}
          <div className='flex flex-wrap items-center gap-4'>
            {hasResume && (
              <a
                href={`${BASE_URL}/api/v1/public/portfolios/${id}/resume`}
                download
                className='inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0a0a0a] text-xs font-bold tracking-widest uppercase hover:bg-white/90 transition-colors'>
                <Download size={13} />
                Resume
              </a>
            )}
            {portfolio.settings?.showContactInfo && (
              <a
                href='#contact'
                className='inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white text-xs font-bold tracking-widest uppercase hover:border-white/60 transition-colors'>
                Contact
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className='absolute bottom-8 left-6 flex items-center gap-3 text-white/20'>
        <div className='w-8 h-px bg-white/20' />
        <span className='text-[10px] tracking-[0.3em] uppercase'>Scroll</span>
      </div>
    </section>
  );
};

export default BCTHero;
