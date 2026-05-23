import React from "react";
import { ExternalLink } from "lucide-react";
import type { Project } from "@cyopo/Models/portfolio/portfolio.model";

const GitHubIcon = () => (
  <svg viewBox='0 0 24 24' width='14' height='14' fill='currentColor'>
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836a9.59 9.59 0 012.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z'
    />
  </svg>
);

const BCTProjects: React.FC<{ projects: Project[] }> = ({ projects }) => (
  <section id='work' className='bg-[#0a0a0a]'>
    {/* Section header — label uses var(--tp) */}
    <div className='max-w-7xl mx-auto px-6 py-16 flex items-end justify-between border-b border-white/5'>
      <div>
        <p style={{ color: "var(--tp)" }} className='text-[10px] font-bold tracking-[0.4em] uppercase mb-3'>
          Selected Works
        </p>
        <h2 className='font-black uppercase text-white leading-none' style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
          Projects
        </h2>
      </div>
      <p className='text-xs text-white/20 tracking-widest uppercase'>
        {projects.length} {projects.length === 1 ? "Project" : "Projects"}
      </p>
    </div>

    {/* Project cards */}
    {projects.map((project, i) => (
      <div key={project.id ?? i} className='relative h-[70vh] overflow-hidden group cursor-pointer border-b border-white/5'>
        {/* Background — gradient fallback uses var(--tp) */}
        {project.thumbnail ? (
          <img
            src={project.thumbnail}
            alt={project.title}
            className='absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700'
          />
        ) : (
          <div
            className='absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-500'
            style={{
              background:
                i % 2 === 0 ? `linear-gradient(to bottom right, var(--tp), transparent)` : `linear-gradient(to top right, var(--tp), transparent)`,
            }}
          />
        )}

        {/* Dark overlay */}
        <div className='absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/40 to-transparent' />

        {/* Content */}
        <div className='absolute bottom-0 left-0 right-0 p-10'>
          <div className='flex items-end justify-between gap-4'>
            <div>
              {/* Tech + year — uses var(--tp) */}
              {(project.technologies?.length > 0 || project.completedDate) && (
                <p style={{ color: "var(--tp)" }} className='text-[10px] font-bold tracking-[0.3em] uppercase mb-3'>
                  {project.technologies?.slice(0, 2).join(" / ")}
                  {project.completedDate ? ` · ${new Date(project.completedDate).getFullYear()}` : ""}
                </p>
              )}

              <h2 className='font-black uppercase text-white leading-none' style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
                {project.title}
              </h2>

              {project.description && (
                <p className='text-white/40 text-sm mt-3 max-w-lg leading-relaxed'>
                  {project.description.length > 120 ? project.description.slice(0, 120) + "..." : project.description}
                </p>
              )}
            </div>

            {/* Links */}
            <div className='flex items-center gap-3 flex-shrink-0'>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all'>
                  <GitHubIcon />
                </a>
              )}
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='w-10 h-10 border border-white/20 flex items-center justify-center text-white/50 hover:text-white hover:border-white/60 transition-all'>
                  <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    ))}
  </section>
);

export default BCTProjects;
