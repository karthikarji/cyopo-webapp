import React from "react";
import type { Education } from "@cyopo/Models/portfolio/portfolio.model";

const MLTEducation: React.FC<{ educations: Education[] }> = ({ educations }) => (
  <section id='education' className='py-24 bg-white'>
    <div className='max-w-6xl mx-auto px-6'>
      <div className='text-center mb-16'>
        <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Education</h2>
        <p className='text-gray-400'>Academic background and qualifications.</p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto'>
        {educations.map((edu, i) => (
          <div
            key={edu.id ?? i}
            className='bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all duration-200'>
            {/* Institution icon + name */}
            <div className='flex items-start gap-4 mb-4'>
              <div className='w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center flex-shrink-0 shadow-sm'>
                <span className='material-symbols-outlined text-gray-500 text-[18px]'>school</span>
              </div>
              <div className='flex-1 min-w-0'>
                <h3 className='font-bold text-gray-900 truncate'>{edu.institution}</h3>
                <p className='text-sm text-gray-500 font-medium'>
                  {edu.degree}
                  {edu.field ? ` · ${edu.field}` : ""}
                </p>
              </div>
            </div>

            {/* Dates + grade */}
            <div className='flex items-center justify-between text-xs text-gray-400 mb-3'>
              <span>
                {edu.startDate}
                {edu.startDate ? " — " : ""}
                {edu.isCurrent ? "Present" : edu.endDate}
              </span>
              {edu.grade && <span className='px-2 py-0.5 bg-white border border-gray-200 rounded-md font-medium text-gray-600'>{edu.grade}</span>}
            </div>

            {edu.description && <p className='text-sm text-gray-500 leading-relaxed'>{edu.description}</p>}
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MLTEducation;
