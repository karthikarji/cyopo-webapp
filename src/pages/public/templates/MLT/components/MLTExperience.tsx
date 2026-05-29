import React from "react";
import type { Experience } from "@cyopo/Models/portfolio/portfolio.model";

const formatDate = (date: string | null) => {
  if (!date) return "";
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
};

const TYPE_LABEL: Record<string, string> = {
  FULL_TIME: "Full Time",
  PART_TIME: "Part Time",
  INTERNSHIP: "Internship",
  FREELANCE: "Freelance",
  CONTRACT: "Contract",
};

const MLTExperience: React.FC<{ experiences: Experience[] }> = ({ experiences }) => {
  // Split into internships and regular experience
  const internships = experiences.filter((e) => e.type === "INTERNSHIP");
  const regular = experiences.filter((e) => e.type !== "INTERNSHIP");

  const renderCard = (exp: Experience, i: number) => (
    <div key={exp.id ?? i} className='flex gap-8'>
      {/* Dot — uses var(--tp) */}
      <div className='flex-shrink-0 w-8 flex flex-col items-center'>
        <div className='w-3 h-3 rounded-full ring-4 ring-white border border-gray-200 mt-1.5 z-10' style={{ background: "var(--tp)" }} />
      </div>

      {/* Card */}
      <div className='flex-1 bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200 mb-2'>
        <div className='flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3'>
          <div className='flex-1'>
            {/* Date + location */}
            <p className='text-xs text-gray-400 font-medium mb-1 uppercase tracking-wide'>
              {formatDate(exp.startDate)} — {exp.isCurrent ? "Present" : formatDate(exp.endDate ?? null)}
              {exp.location ? ` · ${exp.location}` : ""}
            </p>
            <h3 className='font-bold text-gray-900 text-lg'>{exp.title}</h3>
            <p className='text-gray-500 font-medium text-sm'>{exp.company}</p>
          </div>

          {/* Type badge — show when not FULL_TIME */}
          {exp.type && exp.type !== "FULL_TIME" && (
            <span className='self-start text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary-container text-on-secondary-container flex-shrink-0'>
              {TYPE_LABEL[exp.type] ?? exp.type}
            </span>
          )}
        </div>

        {exp.description && <p className='text-sm text-gray-600 leading-relaxed mb-3'>{exp.description}</p>}

        {exp.achievements?.length > 0 && (
          <ul className='flex flex-col gap-1.5 mb-3'>
            {exp.achievements.map((a, j) => (
              <li key={j} className='text-sm text-gray-600 flex gap-2'>
                <span className='text-gray-400 flex-shrink-0 mt-0.5'>→</span>
                {a}
              </li>
            ))}
          </ul>
        )}

        {exp.technologies?.length > 0 && (
          <div className='flex flex-wrap gap-1.5 mt-3'>
            {exp.technologies.map((tech, j) => (
              <span key={j} className='px-2 py-0.5 bg-white border border-gray-200 text-gray-600 text-xs rounded-md font-medium'>
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section id='experience' className='py-24 bg-white'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* ─── Work Experience ─────────────────────────────────── */}
        {regular.length > 0 && (
          <>
            <div className='text-center mb-16'>
              <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Professional Journey</h2>
              <p className='text-gray-400'>Where I have been and what I have built.</p>
            </div>

            <div className='relative max-w-3xl mx-auto mb-20'>
              <div className='absolute left-4 top-2 bottom-2 w-px bg-gray-200' />
              <div className='flex flex-col gap-8'>{regular.map((exp, i) => renderCard(exp, i))}</div>
            </div>
          </>
        )}

        {/* ─── Internships ─────────────────────────────────────── */}
        {internships.length > 0 && (
          <>
            <div className='text-center mb-16'>
              <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Internships</h2>
              <p className='text-gray-400'>Hands-on experience and learning opportunities.</p>
            </div>

            <div className='relative max-w-3xl mx-auto'>
              <div className='absolute left-4 top-2 bottom-2 w-px bg-gray-200' />
              <div className='flex flex-col gap-8'>{internships.map((exp, i) => renderCard(exp, i))}</div>
            </div>
          </>
        )}

        {/* Empty state — only if no experiences at all */}
        {regular.length === 0 && internships.length === 0 && null}
      </div>
    </section>
  );
};

export default MLTExperience;
