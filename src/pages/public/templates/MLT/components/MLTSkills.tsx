import React from "react";
import type { Skill } from "@cyopo/Models/portfolio/portfolio.model";

const CATEGORY_ICONS: Record<string, string> = {
  FRONTEND: "web",
  BACKEND: "dns",
  DATABASE: "storage",
  DEVOPS: "cloud",
  MOBILE: "smartphone",
  AI_ML: "psychology",
  CLOUD: "cloud_queue",
  PROJECT_MANAGEMENT: "task_alt",
  PRODUCT_MANAGEMENT: "inventory_2",
  BUSINESS_ANALYSIS: "analytics",
  DESIGN: "palette",
  UI_UX_DESIGN: "design_services",
  OTHER: "category",
};

const PROFICIENCY_DOT: Record<string, string> = {
  BEGINNER: "bg-gray-300",
  INTERMEDIATE: "bg-blue-400",
  ADVANCED: "bg-violet-500",
  EXPERT: "bg-green-500",
};

interface Props {
  skills: Skill[];
  showLevels: boolean;
}

const MLTSkills: React.FC<Props> = ({ skills, showLevels }) => {
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const cat = skill.category ?? "OTHER";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(skill);
    return acc;
  }, {});

  return (
    <section id='skills' className='py-24 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Mastered Crafts</h2>
          <p className='text-gray-400'>A curated list of my technical specialisations.</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className='bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200'>
              <div className='flex items-center gap-3 mb-4'>
                <div className='w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center'>
                  <span className='material-symbols-outlined text-gray-500 text-[18px]'>{CATEGORY_ICONS[category] ?? "category"}</span>
                </div>
                <h3 className='font-semibold text-gray-900 text-sm'>{category.replace(/_/g, " ")}</h3>
              </div>

              <div className='flex flex-wrap gap-2'>
                {items.map((skill, i) => (
                  <span
                    key={i}
                    className='inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-700 font-medium'>
                    {showLevels && skill.proficiency && (
                      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${PROFICIENCY_DOT[skill.proficiency] ?? "bg-gray-300"}`} />
                    )}
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        {showLevels && (
          <div className='flex items-center justify-center gap-6 mt-10'>
            {Object.entries(PROFICIENCY_DOT).map(([level, cls]) => (
              <span key={level} className='flex items-center gap-1.5 text-xs text-gray-400'>
                <span className={`w-2 h-2 rounded-full ${cls}`} />
                {level.charAt(0) + level.slice(1).toLowerCase()}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MLTSkills;
