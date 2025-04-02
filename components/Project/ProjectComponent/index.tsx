import { Projectprop as Project } from '@root/types/Project';
import Link from 'next/link';
import { FC } from 'react';

export const ProjectComponent: FC<{ projects: Project[] }> = ({ projects }) => {
  return (
    <div className="py-12 bg-gray-900">
      <ProjectCard projects={projects} />
    </div>
  );
};

const ProjectCardProp: FC<{ project: Project }> = ({ project }) => {
  const backgroundImage = project.proj_img || './assets/best-placeholder.jpg';

  return (
    <Link href={'/project/' + project.proj_id} passHref>
      <div
        className="relative group overflow-hidden duration-500 w-full sm:w-72 lg:w-80 h-auto bg-epic-black-light text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-transform"
      >
        {/* Project Image */}
        <div className="relative w-full h-48 rounded-lg overflow-hidden">
          <div
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className="w-full h-full bg-cover bg-center duration-500 group-hover:scale-105"
          />
        </div>

        {/* Project Details */}
        <div className="my-4">
          <h3 className="text-2xl font-semibold text-white truncate">{project.proj_name}</h3>
          <div
            className={`relative bg-gray-800 text-white my-2 px-4 py-2 rounded-lg border inline-block ${
              (!project.github && !project.hosting) ? 'border-pastel-orange mx-1' : 'border-gray-600'
            }`}
          >
            <p className="text-sm">
              {(!project.github && !project.hosting) ? 'Work in Progress' : project.category}
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
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-8 sm:px-12 md:px-16 2xl:px-24">
      {projects.map((project) => (
        <ProjectCardProp key={project.proj_id} project={project} />
      ))}
    </div>
  );
};
