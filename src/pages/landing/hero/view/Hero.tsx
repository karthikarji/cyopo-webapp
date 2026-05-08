import React from "react";
import { Play } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import useHero from "../controller/useHero";
import {
  HERO_AVATARS,
  HERO_SOCIAL_PROOF_COUNT,
  HERO_SOCIAL_PROOF_TEXT,
  HERO_HEADLINE_1,
  HERO_HEADLINE_ACCENT,
  HERO_HEADLINE_2,
  HERO_SUBHEADLINE,
  HERO_CTA_PRIMARY,
  HERO_CTA_SECONDARY,
} from "../Hero.constants";

const Hero: React.FC = () => {
  const { handlers } = useHero();

  return (
    <section className='relative min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 overflow-hidden'>
      {/* Animated gradient background */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute inset-0 bg-background' />
        <div
          className='absolute inset-0'
          style={{
            background: "radial-gradient(ellipse 100% 70% at 50% -10%, rgba(79,55,138,0.18) 0%, rgba(103,80,164,0.08) 40%, transparent 70%)",
          }}
        />
        {/* Left orb */}
        <div
          className='absolute top-1/3 left-1/4 w-72 h-72 sm:w-[500px] sm:h-[500px] rounded-full blur-3xl'
          style={{
            background: "rgba(79,55,138,0.12)",
            animation: "pulse 4s ease-in-out infinite",
            animationDelay: "0s",
          }}
        />

        {/* Right orb */}
        <div
          className='absolute bottom-1/3 right-1/4 w-56 h-56 sm:w-96 sm:h-96 rounded-full blur-3xl'
          style={{
            background: "rgba(103,80,164,0.10)",
            animation: "pulse 4s ease-in-out infinite",
            animationDelay: "1.5s",
          }}
        />
      </div>

      {/* Social proof badge */}
      <div className='mb-6 inline-flex items-center gap-2 bg-secondary-container px-4 py-1.5 rounded-full text-on-secondary-container text-xs sm:text-sm font-medium'>
        <span className='material-symbols-outlined text-base' style={{ fontVariationSettings: "'FILL' 1" }}>
          verified
        </span>
        {HERO_SOCIAL_PROOF_COUNT} portfolios created
      </div>

      {/* Headline */}
      <h1 className='font-headline font-bold tracking-tight text-on-surface mb-6 max-w-4xl text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight'>
        {HERO_HEADLINE_1} <span className='text-primary'>{HERO_HEADLINE_ACCENT}</span>
        {HERO_HEADLINE_2}
      </h1>

      {/* Subheadline */}
      <p className='text-base sm:text-lg md:text-xl text-on-surface-variant max-w-xl md:max-w-2xl mb-10 leading-relaxed'>{HERO_SUBHEADLINE}</p>

      {/* CTA buttons */}
      <div className='flex flex-col sm:flex-row gap-4 items-center w-full sm:w-auto'>
        <Button variant='primary' size='lg' fullWidth onClick={handlers.handleGetStarted} className='sm:w-auto shadow-md hover:shadow-lg'>
          {HERO_CTA_PRIMARY}
        </Button>
        <Button variant='secondary' size='lg' fullWidth onClick={handlers.handleBrowseTemplates} leftIcon={<Play size={18} />} className='sm:w-auto'>
          {HERO_CTA_SECONDARY}
        </Button>
      </div>

      {/* Social proof avatars */}
      <div className='mt-12 flex flex-col items-center gap-3'>
        <div className='flex items-center'>
          {HERO_AVATARS.map((avatar, index) => (
            <div
              key={index}
              className={[
                "w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-background",
                "flex items-center justify-center",
                "text-xs font-bold text-white",
                avatar.color,
                index > 0 ? "-ml-2 sm:-ml-3" : "",
              ].join(" ")}
              style={{ zIndex: HERO_AVATARS.length - index }}>
              {avatar.initials}
            </div>
          ))}
        </div>
        <p className='text-xs sm:text-sm text-on-surface-variant font-medium italic'>
          Join {HERO_SOCIAL_PROOF_COUNT} {HERO_SOCIAL_PROOF_TEXT}
        </p>
      </div>
    </section>
  );
};

export default Hero;
