import { Projectprop as Project } from '@root/types/Project';
import Link from 'next/link';
import { FC } from 'react';

export const ProjectComponent: FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="py-8 px-4">
      <ProjectCard projects={projects} />
    </div>
  );
};

const ProjectCardProp: FC<{ project: Project; index: number }> = ({ project, index }) => {
  const backgroundImage = project.proj_img || './assets/best-placeholder.jpg';
  const isWIP = !project.github && !project.hosting;

  return (
    <Link href={'/project/' + project.proj_id} passHref>
      <div
        className="group relative overflow-hidden w-full h-full bg-gray-900 rounded-2xl transition-all duration-500 transform hover:-translate-y-3 hover:shadow-2xl cursor-pointer"
        style={{ 
          animationDelay: `${index * 0.1}s`,
          animation: 'fadeInUp 0.6s ease-out forwards',
          opacity: 0
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl blur-xl" />
        
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-700/50 via-gray-800/50 to-gray-900/50 group-hover:from-blue-500/50 group-hover:via-purple-500/50 group-hover:to-pink-500/50 transition-all duration-500" style={{ padding: '1px' }}>
          <div className="h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl" />
        </div>

        <div className="relative z-10">
          {isWIP && (
            <div className="absolute top-4 right-4 z-20 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg animate-pulse">
              WIP
            </div>
          )}

          <div className="relative w-full h-64 overflow-hidden rounded-t-2xl">
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/20 group-hover:via-purple-600/20 group-hover:to-pink-600/20 transition-all duration-700 z-10" />
            
            <div
              style={{ backgroundImage: `url(${backgroundImage})` }}
              className="w-full h-full bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
            />
            
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            </div>
          </div>

          <div className="relative p-6">
            <h3 className="text-2xl font-bold text-white mb-3 truncate group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:via-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
              {project.proj_name}
            </h3>
            
            <div className="flex items-center gap-2 mb-4">
              <div
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  isWIP 
                    ? 'bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/50 text-orange-300' 
                    : 'bg-gray-800/80 border border-gray-700 text-gray-300 group-hover:border-purple-500/50 group-hover:text-purple-300 group-hover:shadow-lg group-hover:shadow-purple-500/20'
                }`}
              >
                <span className="relative z-10">{isWIP ? 'In Development' : project.category}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-gray-500 group-hover:text-purple-400 transition-colors duration-300">
              <span className="text-sm font-medium">View Project</span>
              <svg className="w-4 h-4 transform translate-x-0 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-purple-500/10 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0s' }} />
          <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '0.3s' }} />
          <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.6s' }} />
        </div>
      </div>
    </Link>
  );
};

interface ProjectCardProps {
  projects: Project[];
}

const ProjectCard: FC<ProjectCardProps> = ({ projects }) => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 px-4 sm:px-8 md:px-12 lg:px-16">
        {projects.map((project, index) => (
          <ProjectCardProp key={project.proj_id} project={project} index={index} />
        ))}
      </div>
    </div>
  );
};