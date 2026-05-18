import React from "react";
import type { Skill } from "@cyopo/Models/portfolio/portfolio.model";

interface Props {
  skills: Skill[];
  showLevels: boolean;
}

const BCTSkills: React.FC<Props> = ({ skills, showLevels }) => (
  <section id='skills' className='bg-[#0f0f0f] py-20 px-6 overflow-hidden'>
    <div className='max-w-7xl mx-auto'>
      <p className='text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 mb-8'>Core Abilities</p>
      <div className='flex flex-wrap gap-3'>
        {skills.map((skill, i) => (
          <div
            key={i}
            className='flex items-center gap-2 border border-white/10 px-5 py-3 hover:border-[#e63329]/50 hover:bg-[#e63329]/5 transition-all duration-200 group'>
            <span className='text-sm font-bold uppercase tracking-widest text-white group-hover:text-white'>{skill.name}</span>
            {showLevels && skill.proficiency && (
              <span className='text-[9px] text-white/20 uppercase tracking-widest group-hover:text-[#e63329]'>{skill.proficiency.toLowerCase()}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default BCTSkills;
