import React from "react";
import type { Education } from "@cyopo/Models/portfolio/portfolio.model";

const BCTEducation: React.FC<{ educations: Education[] }> = ({ educations }) => (
  <section id='education' className='bg-[#0f0f0f] py-24 px-6'>
    <div className='max-w-7xl mx-auto'>
      <h2 className='font-black uppercase leading-none text-white mb-16' style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
        Academic
        <br />
        Background
      </h2>

      <div className='flex flex-col divide-y divide-white/5'>
        {educations.map((edu, i) => (
          <div
            key={edu.id ?? i}
            className='flex flex-col sm:grid sm:grid-cols-[180px_1fr_320px] sm:items-center gap-2 sm:gap-6 py-6 group border-b border-white/5'>
            {/* Year range */}
            <p className='text-xs text-white/30 font-medium tracking-widest uppercase'>
              {edu.startDate ?? ""}
              {edu.startDate ? " — " : ""}
              {edu.isCurrent ? "Present" : (edu.endDate ?? "")}
            </p>

            {/* Divider — hover uses var(--tp) */}
            <div
              className='hidden sm:block h-px bg-white/5 transition-colors duration-200'
              onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--tp) 30%, transparent)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            />

            {/* Degree + institution — institution uses var(--tp) */}
            <div className='sm:text-right'>
              <p className='font-black uppercase text-white text-base sm:text-lg tracking-wide'>
                {edu.degree}
                {edu.field ? ` — ${edu.field}` : ""}
              </p>
              <p style={{ color: "var(--tp)" }} className='text-xs font-bold tracking-widest uppercase mt-0.5'>
                {edu.institution}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BCTEducation;
