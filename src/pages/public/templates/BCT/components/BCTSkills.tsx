import React from "react";
import type { Skill } from "@cyopo/Models/portfolio/portfolio.model";

interface Props {
  skills: Skill[];
  showLevels: boolean;
  customSkillCategories?: string[];
}

const BCTSkills: React.FC<Props> = ({ skills, showLevels, customSkillCategories = [] }) => {
  // Group by category key
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const key = skill.customCategory ? skill.customCategory : (skill.category ?? "OTHER");
    if (!acc[key]) acc[key] = [];
    acc[key].push(skill);
    return acc;
  }, {});

  const standardKeys = Object.keys(grouped).filter((k) => !customSkillCategories.includes(k));
  const customKeys = Object.keys(grouped).filter((k) => customSkillCategories.includes(k));
  const orderedKeys = [...standardKeys, ...customKeys];

  // If no grouping needed (few skills) — flat list
  const useGrouped = orderedKeys.length > 1;

  return (
    <section id='skills' className='bg-[#0f0f0f] py-20 px-6 overflow-hidden'>
      <div className='max-w-7xl mx-auto'>
        <p className='text-[10px] font-bold tracking-[0.4em] uppercase text-white/30 mb-8'>Core Abilities</p>

        {useGrouped ? (
          /* Grouped by category */
          <div className='flex flex-col gap-10'>
            {orderedKeys.map((category) => {
              const items = grouped[category];
              const isCustom = customSkillCategories.includes(category);
              return (
                <div key={category}>
                  {/* Category label */}
                  <p
                    className='text-[10px] font-bold tracking-[0.3em] uppercase mb-4'
                    style={{ color: isCustom ? "var(--tp)" : "rgba(255,255,255,0.2)" }}>
                    {category.replace(/_/g, " ")}
                  </p>
                  <div className='flex flex-wrap gap-3'>
                    {items.map((skill, i) => (
                      <div
                        key={i}
                        className='flex items-center gap-2 border border-white/10 px-5 py-3 transition-all duration-200 group cursor-default'
                        onMouseEnter={(e) => {
                          e.currentTarget.style.borderColor = "color-mix(in srgb, var(--tp) 50%, transparent)";
                          e.currentTarget.style.background = "color-mix(in srgb, var(--tp) 5%, transparent)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.borderColor = "";
                          e.currentTarget.style.background = "";
                        }}>
                        <span className='text-sm font-bold uppercase tracking-widest text-white'>{skill.name}</span>
                        {showLevels && skill.proficiency && (
                          <span className='text-[9px] uppercase tracking-widest text-white/20 transition-colors duration-200 group-hover:text-[color:var(--tp)]'>
                            {skill.proficiency.toLowerCase()}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Flat list — original design */
          <div className='flex flex-wrap gap-3'>
            {skills.map((skill, i) => (
              <div
                key={i}
                className='flex items-center gap-2 border border-white/10 px-5 py-3 transition-all duration-200 group cursor-default'
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "color-mix(in srgb, var(--tp) 50%, transparent)";
                  e.currentTarget.style.background = "color-mix(in srgb, var(--tp) 5%, transparent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "";
                  e.currentTarget.style.background = "";
                }}>
                <span className='text-sm font-bold uppercase tracking-widest text-white'>{skill.name}</span>
                {showLevels && skill.proficiency && (
                  <span className='text-[9px] uppercase tracking-widest text-white/20 group-hover:text-[color:var(--tp)] transition-colors duration-200'>
                    {skill.proficiency.toLowerCase()}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BCTSkills;
