import React from "react";
import type { Education } from "@cyopo/Models/portfolio/portfolio.model";

const BCTEducation: React.FC<{ educations: Education[] }> = ({ educations }) => (
  <section className='bg-[#0f0f0f] py-24 px-6'>
    <div className='max-w-7xl mx-auto'>
      {/* Heading — full width top */}
      <h2 className='font-black uppercase leading-none text-white mb-16' style={{ fontSize: "clamp(1.5rem, 3vw, 2.5rem)" }}>
        Academic
        <br />
        Background
      </h2>

      {/* Table — full width below */}
      <div className='flex flex-col divide-y divide-white/5'>
        {educations.map((edu, i) => (
          <div key={edu.id ?? i} className='grid grid-cols-[180px_1fr_320px] items-center gap-6 py-6 group'>
            {/* Year range */}
            <p className='text-xs text-white/30 font-medium tracking-widest uppercase'>
              {edu.startDate ?? ""}
              {edu.startDate ? " — " : ""}
              {edu.isCurrent ? "Present" : (edu.endDate ?? "")}
            </p>

            {/* Divider */}
            <div className='h-px bg-white/5 group-hover:bg-[#e63329]/30 transition-colors' />

            {/* Degree + institution */}
            <div className='text-right'>
              <p className='font-black uppercase text-white text-lg tracking-wide'>
                {edu.degree}
                {edu.field ? ` — ${edu.field}` : ""}
              </p>
              <p className='text-[#e63329] text-xs font-bold tracking-widest uppercase mt-0.5'>{edu.institution}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BCTEducation;
