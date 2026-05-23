import React from "react";
import type { Experience } from "@cyopo/Models/portfolio/portfolio.model";

const BCTExperience: React.FC<{ experiences: Experience[] }> = ({ experiences }) => (
  <section id='experience' className='bg-[#0a0a0a] py-24 px-6'>
    <div className='max-w-7xl mx-auto'>
      <h2 className='font-black uppercase leading-none text-white mb-16' style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
        Professional
        <br />
        Trajectory
      </h2>

      <div className='flex flex-col divide-y divide-white/5'>
        {experiences.map((exp, i) => (
          <div
            key={exp.id ?? i}
            className='flex flex-col sm:grid sm:grid-cols-[180px_1fr_320px] sm:items-center gap-2 sm:gap-6 py-6 group border-b border-white/5'>
            {/* Year range */}
            <p className='text-xs text-white/30 font-medium tracking-widest uppercase'>
              {exp.startDate ? new Date(exp.startDate).getFullYear() : ""}
              {" — "}
              {exp.isCurrent ? "Present" : exp.endDate ? new Date(exp.endDate).getFullYear() : ""}
            </p>

            {/* Divider — hover uses var(--tp) */}
            <div
              className='hidden sm:block h-px bg-white/5 transition-colors duration-200'
              onMouseEnter={(e) => (e.currentTarget.style.background = "color-mix(in srgb, var(--tp) 30%, transparent)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "")}
            />

            {/* Role + company — company uses var(--tp) */}
            <div className='sm:text-right'>
              <p className='font-black uppercase text-white text-base sm:text-lg tracking-wide'>{exp.title}</p>
              <p style={{ color: "var(--tp)" }} className='text-xs font-bold tracking-widest uppercase mt-0.5'>
                {exp.company}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BCTExperience;
