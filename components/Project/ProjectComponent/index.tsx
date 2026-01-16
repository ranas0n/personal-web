import { Projectprop as Project } from '@root/types/Project';
import Link from 'next/link';
import { FC } from 'react';

export const ProjectComponent: FC<{ projects: Project[] }> = ({ projects }) => {
  return <ProjectCard projects={projects} />;
};

const ProjectCardProp: FC<{ project: Project; index: number }> = ({ project, index }) => {
  const backgroundImage = project.proj_img || './assets/best-placeholder.jpg';
  const isWIP = !project.github && !project.hosting;

  return (
    <Link href={'/project/' + project.proj_id} passHref>
      <div
        className="bg-epic-black-light hover:bg-epic-black rounded-md h-56 flex flex-col cursor-pointer transition-all duration-300"
        style={{
          animationDelay: `${index * 0.1}s`,
          animation: 'fadeInUp 0.6s ease-out forwards',
          opacity: 0
        }}
      >
        <div className="relative w-full h-40 overflow-hidden rounded-t-md">
          <img
            src={backgroundImage}
            alt={project.proj_name}
            className="w-full h-full object-cover"
          />
          {isWIP && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded">
              WIP
            </div>
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="text-white font-medium text-sm mb-2 truncate">
              {project.proj_name}
            </h3>
            <p className="text-gray-400 text-xs">
              {isWIP ? 'In Development' : project.category}
            </p>
          </div>
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
    <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 mt-8 px-8 sm:px-20 md:px-24 2xl:px-56">
      {projects.map((project, index) => (
        <ProjectCardProp key={project.proj_id} project={project} index={index} />
      ))}
    </div>
  );
};