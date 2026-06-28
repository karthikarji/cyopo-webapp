import React from "react";
import { ArrowRight } from "lucide-react";
import Button from "@cyopo/Components/button/Button";
import { SHOWCASE_TITLE, SHOWCASE_SUBTITLE, SHOWCASE_CTA } from "../TemplateShowcase.constants";
import type { TemplateShowcaseItem } from "../TemplateShowcase.model.d";
import useTemplateShowcase from "../controller/useTemplateShowcase";

// ─── Skeleton card ────────────────────────────────────────────────
const TemplateCardSkeleton: React.FC = () => (
  <div className='rounded-xl overflow-hidden bg-surface shadow-sm animate-pulse'>
    <div className='aspect-[4/5] bg-surface-container' />
    <div className='p-4 flex flex-col gap-2'>
      <div className='h-3 rounded-full bg-surface-container w-2/3' />
      <div className='h-2 rounded-full bg-surface-container w-1/3' />
    </div>
  </div>
);

// ─── Template mini preview ────────────────────────────────────────
const TemplateMiniPreview: React.FC<{ template: TemplateShowcaseItem }> = ({ template }) => {
  // If real thumbnail exists — show it
  if (template.thumbnail) {
    return <img src={template.thumbnail} alt={template.name} className='w-full h-full object-cover' />;
  }

  // Fallback — gradient mock preview
  return (
    <div className='w-full h-full p-3 flex flex-col gap-2' style={{ background: template.gradient }}>
      {/* Mock nav bar */}
      <div className='flex items-center gap-1.5'>
        <div
          className='w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0'
          style={{ background: template.accentColor }}>
          c
        </div>
        <div className='h-1.5 rounded-full w-12 opacity-30' style={{ background: template.accentColor }} />
        <div className='flex-1' />
        <div className='h-1.5 rounded-full w-6 opacity-20' style={{ background: template.accentColor }} />
        <div className='h-1.5 rounded-full w-6 opacity-20' style={{ background: template.accentColor }} />
      </div>

      {/* Mock hero */}
      <div className='flex items-center gap-2 mt-1'>
        <div className='w-8 h-8 rounded-full flex-shrink-0 opacity-80' style={{ background: template.accentColor }} />
        <div className='flex flex-col gap-1 flex-1'>
          <div className='h-2 rounded-full w-3/4 opacity-40' style={{ background: template.accentColor }} />
          <div className='h-1.5 rounded-full w-1/2 opacity-25' style={{ background: template.accentColor }} />
        </div>
      </div>

      {/* Mock content blocks */}
      <div className='flex gap-1.5 mt-1'>
        {[70, 50, 60].map((w, i) => (
          <div key={i} className='h-1.5 rounded-full opacity-20' style={{ background: template.accentColor, width: `${w}%` }} />
        ))}
      </div>

      {/* Mock cards row */}
      <div className='flex gap-1.5 flex-1 mt-1'>
        {[1, 2].map((i) => (
          <div key={i} className='flex-1 rounded-lg opacity-10' style={{ background: template.accentColor }} />
        ))}
      </div>
    </div>
  );
};

// ─── Main component ───────────────────────────────────────────────
const TemplateShowcase: React.FC = () => {
  const { templates, isLoading } = useTemplateShowcase();

  return (
    <section id='templates' className='py-16 sm:py-20 lg:py-24 bg-surface-container-low'>
      <div className='max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Section header */}
        <div className='flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 lg:mb-12'>
          <div>
            <h2 className='font-headline font-bold text-on-surface mb-2 text-2xl sm:text-3xl lg:text-4xl'>{SHOWCASE_TITLE}</h2>
            <p className='text-on-surface-variant text-sm sm:text-base'>{SHOWCASE_SUBTITLE}</p>
          </div>
          <Button
            variant='ghost'
            size='sm'
            rightIcon={<ArrowRight size={16} />}
            className='text-primary hover:text-primary self-start sm:self-auto flex-shrink-0'>
            {SHOWCASE_CTA}
          </Button>
        </div>

        {/* Template grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8'>
          {/* Loading skeletons */}
          {isLoading && Array.from({ length: 4 }).map((_, i) => <TemplateCardSkeleton key={i} />)}

          {/* Loaded templates */}
          {!isLoading &&
            templates.map((template) => (
              <div
                key={template.id}
                className={[
                  "group relative rounded-xl overflow-hidden",
                  "bg-surface shadow-sm hover:shadow-xl",
                  "transition-all duration-300 cursor-pointer",
                ].join(" ")}>
                {/* Template preview */}
                <div className='aspect-[4/5] overflow-hidden'>
                  <div className='w-full h-full group-hover:scale-105 transition-transform duration-500'>
                    <TemplateMiniPreview template={template} />
                  </div>
                </div>

                {/* Hover overlay */}
                <div className='absolute inset-0 bg-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]'>
                  <button className='bg-surface text-on-surface px-5 py-2 rounded-full font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300'>
                    Use this template
                  </button>
                </div>

                {/* Premium badge */}
                {template.isPremium && (
                  <div className='absolute top-3 left-3 flex items-center gap-1 bg-tertiary-container text-on-tertiary-container px-2.5 py-1 rounded-full text-xs font-semibold'>
                    <span className='material-symbols-outlined text-sm' style={{ fontVariationSettings: "'FILL' 1" }}>
                      workspace_premium
                    </span>
                    Premium
                  </div>
                )}

                {/* Card info */}
                <div className='p-4'>
                  <h4 className='font-headline font-bold text-on-surface text-sm mb-0.5 capitalize'>{template.name}</h4>
                  <p className='text-xs text-on-surface-variant uppercase tracking-widest line-clamp-1'>{template.category}</p>
                </div>
              </div>
            ))}

          {/* Empty state — API returned nothing */}
          {!isLoading && templates.length === 0 && (
            <div className='col-span-full flex flex-col items-center justify-center py-16 gap-2 text-center'>
              <span className='material-symbols-outlined text-3xl text-on-surface-variant/30'>style</span>
              <p className='text-sm text-on-surface-variant'>No templates available yet</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TemplateShowcase;
