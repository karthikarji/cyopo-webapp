import React from "react";
import { ExternalLink } from "lucide-react";
import type { Project } from "@cyopo/Models/portfolio/portfolio.model";

const GitHubIcon = () => (
  <svg viewBox='0 0 24 24' width='14' height='14' fill='currentColor'>
    <path d='M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z' />
  </svg>
);

const MLTProjects: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <section id='projects' className='py-24 bg-gray-50'>
    <div className='max-w-6xl mx-auto px-6'>
      <div className='flex items-end justify-between mb-16'>
        <div>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>Selected Works</h2>
          <p className='text-gray-400'>Experimental builds and commercial projects.</p>
        </div>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
        {projects.map((project, i) => (
          <div
            key={project.id ?? i}
            className='bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 group'>
            {/* Thumbnail or gradient placeholder */}
            <div className='h-44 overflow-hidden bg-gradient-to-br from-violet-50 to-blue-50 flex items-center justify-center'>
              {project.thumbnail ? (
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
                />
              ) : (
                <span className='material-symbols-outlined text-5xl text-violet-200'>folder_special</span>
              )}
            </div>

            <div className='p-5'>
              {/* Tech tags */}
              {project.technologies?.length > 0 && (
                <div className='flex flex-wrap gap-1.5 mb-3'>
                  {project.technologies.slice(0, 4).map((tech, j) => (
                    <span key={j} className='px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-md font-medium'>
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <h3 className='font-bold text-gray-900 text-lg mb-2'>{project.title}</h3>

              {project.description && (
                <p className='text-sm text-gray-500 leading-relaxed mb-4'>
                  {project.description.length > 120 ? project.description.slice(0, 120) + "..." : project.description}
                </p>
              )}

              {/* Links */}
              <div className='flex items-center gap-2'>
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-gray-700 transition-colors'>
                    <ExternalLink size={11} />
                    Live Demo
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='inline-flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 text-gray-600 text-xs font-medium rounded-lg hover:bg-gray-50 transition-colors'>
                    <GitHubIcon />
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default MLTProjects;
