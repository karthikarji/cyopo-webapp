import React from "react";
import { FEATURE_ITEMS, FEATURES_LABEL, FEATURES_TITLE, FEATURES_SUBTITLE } from "../Features.constants";

const Features: React.FC = () => {
  return (
    <section id='features' className='py-12 sm:py-14 lg:py-18 bg-background'>
      <div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='text-center mb-12 lg:mb-16'>
          <p className='text-xs font-label font-semibold tracking-widest text-primary uppercase mb-3'>{FEATURES_LABEL}</p>
          <h2 className='font-headline font-bold text-on-surface mb-4 text-2xl sm:text-3xl lg:text-4xl'>{FEATURES_TITLE}</h2>
          <p className='text-on-surface-variant max-w-xl mx-auto text-sm sm:text-base leading-relaxed'>{FEATURES_SUBTITLE}</p>
        </div>

        {/* Features grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
          {FEATURE_ITEMS.map((feature) => (
            <div
              key={feature.title}
              className={[
                "group p-6 sm:p-8",
                "bg-surface border border-outline-variant/30",
                "rounded-2xl shadow-sm",
                "hover:shadow-md hover:border-primary/20",
                "transition-all duration-200",
              ].join(" ")}>
              {/* Icon */}
              <div className='w-11 h-11 rounded-xl bg-secondary-container flex items-center justify-center text-primary mb-5 group-hover:scale-110 transition-transform duration-200'>
                <span className='material-symbols-outlined text-xl'>{feature.icon}</span>
              </div>

              {/* Title */}
              <h3 className='font-headline font-bold text-on-surface mb-2 text-base sm:text-lg'>{feature.title}</h3>

              {/* Description */}
              <p className='text-on-surface-variant text-sm leading-relaxed'>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
