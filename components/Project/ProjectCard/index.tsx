import { Projectprop as Project } from '@root/types/Project';
import Link from 'next/link';
import { FC } from 'react';

export const ProjectCard: FC<{ projects: Project[] }> = ({ projects }) => {
  return <ProjectSection projects={projects} />;
};

const ProjectCardProp: FC<{ project: Project }> = ({ project }) => {
  const backgroundImage = project.proj_img || './assets/best-placeholder.jpg';

  return (
    <Link href={'/project/' + project.proj_id} passHref>
      <div
        className="relative group overflow-hidden duration-500 w-full lg:w-80 h-auto bg-epic-black-light text-white p-5 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform"
      >
        {/* Project Image */}
        <div className="relative w-full h-52 rounded-lg overflow-hidden">
          <div
            style={{ backgroundImage: `url(${backgroundImage})` }}
            className="w-full h-full bg-cover bg-center duration-500 group-hover:scale-105"
          />
        </div>

        {/* Project Details */}
        <div className="my-4">
          <h3 className="text-xl font-semibold truncate">{project.proj_name}</h3>
          <div
            className={`relative bg-gray-900 text-white my-1 px-2 py-1 rounded-lg border inline-block ${
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

interface ProjectSectionProps {
  projects: Project[];
}

const ProjectSection: FC<ProjectSectionProps> = ({ projects }) => {
  return (
    <div className="w-full flex flex-wrap justify-start content gap-10 mt-1 px-8 sm:px-20 md:px-24 2xl:px-56">
      {projects.map((project) => (
        <ProjectCardProp key={project.proj_id} project={project} />
      ))}
    </div>
  );
};
