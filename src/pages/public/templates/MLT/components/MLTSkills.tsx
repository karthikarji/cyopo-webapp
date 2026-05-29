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

const getProficiencyStyle = (proficiency: string) => {
  switch (proficiency) {
    case "BEGINNER":
      return { className: "bg-gray-300", style: {} };
    case "INTERMEDIATE":
      return { className: "bg-blue-400", style: {} };
    case "ADVANCED":
      return { className: "", style: { background: "var(--ts)" } };
    case "EXPERT":
      return { className: "bg-green-500", style: {} };
    default:
      return { className: "bg-gray-300", style: {} };
  }
};

interface Props {
  skills: Skill[];
  showLevels: boolean;
  customSkillCategories?: string[];
}

const MLTSkills: React.FC<Props> = ({ skills, showLevels, customSkillCategories = [] }) => {
  // Group by category — custom skills use their customCategory as key
  const grouped = skills.reduce<Record<string, Skill[]>>((acc, skill) => {
    const key = skill.customCategory ? skill.customCategory : (skill.category ?? "OTHER");
    if (!acc[key]) acc[key] = [];
    acc[key].push(skill);
    return acc;
  }, {});

  // Show standard categories first, then custom categories
  const standardKeys = Object.keys(grouped).filter((k) => !customSkillCategories.includes(k));
  const customKeys = Object.keys(grouped).filter((k) => customSkillCategories.includes(k));
  const orderedKeys = [...standardKeys, ...customKeys];

  return (
    <section id='skills' className='py-24 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Mastered Crafts</h2>
          <p className='text-gray-400'>A curated list of my technical specialisations.</p>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {orderedKeys.map((category) => {
            const items = grouped[category];
            const isCustom = customSkillCategories.includes(category);
            return (
              <div key={category} className='bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-all duration-200'>
                <div className='flex items-center gap-3 mb-4'>
                  <div className='w-9 h-9 rounded-xl bg-gray-50 flex items-center justify-center'>
                    <span className='material-symbols-outlined text-gray-500 text-[18px]'>
                      {isCustom ? "label" : (CATEGORY_ICONS[category] ?? "category")}
                    </span>
                  </div>
                  <h3 className='font-semibold text-gray-900 text-sm'>{category.replace(/_/g, " ")}</h3>
                </div>

                <div className='flex flex-wrap gap-2'>
                  {items.map((skill, i) => {
                    const dot = getProficiencyStyle(skill.proficiency ?? "");
                    return (
                      <span
                        key={i}
                        className='inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-700 font-medium'>
                        {showLevels && skill.proficiency && (
                          <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${dot.className}`} style={dot.style} />
                        )}
                        {skill.name}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        {showLevels && (
          <div className='flex items-center justify-center gap-6 mt-10'>
            {(["BEGINNER", "INTERMEDIATE", "ADVANCED", "EXPERT"] as const).map((level) => {
              const dot = getProficiencyStyle(level);
              return (
                <span key={level} className='flex items-center gap-1.5 text-xs text-gray-400'>
                  <span className={`w-2 h-2 rounded-full ${dot.className}`} style={dot.style} />
                  {level.charAt(0) + level.slice(1).toLowerCase()}
                </span>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default MLTSkills;
