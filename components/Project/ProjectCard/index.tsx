import { ProjectProps } from '@root/pages/project';
import { Project } from '@root/types/Project';
import Link from 'next/link';
import { FC } from 'react';
import { AiFillGithub } from 'react-icons/ai';
import { IoIosLink } from 'react-icons/io';

export const ProjectCard: FC<ProjectProps> = ({ projects }: ProjectProps) => {
  return <ProjectSection projects={projects} />;
};

const ProjectCardProp: FC<Project> = ({
  proj_id,
  proj_name,
  proj_img,
  hosting,
  github,
  category,
  description,
}) => {
  const backgroundImage = proj_img || './assets/best-placeholder.jpg';

  return (
    <Link href={'project/'+proj_id} passHref>
        <div
          className="relative group overflow-hidden duration-500 w-full lg:w-80 h-auto bg-epic-black-light text-white p-5 rounded-lg shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform"
          >
          <div className="relative w-full h-52 rounded-lg overflow-hidden">
            <div
              style={{ backgroundImage: `url(${backgroundImage})` }}
              className="w-full h-full bg-cover bg-center duration-500 group-hover:scale-105"
              />
          </div>

          <div className="my-4">
            <h3 className="text-xl font-semibold truncate">{proj_name}</h3>
            <div className="relative  bg-gray-900 text-white my-1 px-2 py-1 rounded-lg border border-gray-600 inline-block">
              <p className='text-sm'>
              {category}
              </p>
            </div>
            
            {/* {(!github && !hosting) ? (
              <div className="relative  bg-gray-900 text-white my-1 mx-1 px-2 py-1 rounded-lg border border-pastel-orange inline-block">
              <p className='text-sm'>
              Work on Progress
              </p>
              </div>
              ) :
              (
                <div className='flex justify-end cursor-pointer bg-gray-900 mt-1 text-white px-2 py-1'>
                {github ? <a href={github} target='_blank'>
                <AiFillGithub className='ml-1'/>
                </a> : ''}
                {hosting ? 
                <a href={hosting} target='_blank'>
                <IoIosLink className='ml-1'/> 
                </a>
                : ''}
                </div>
                )} */}
            {/* <div /> */}

            {/* <p className="mt-3 text-sm opacity-0 group-hover:opacity-100 duration-500 text-gray-200">
              {description}
              </p> */}
          </div>
          

          {/* <Link href={href}>
            <a
            className="absolute bottom-5 right-5 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 duration-500 hover:bg-blue-700"
            >
            Learn More
            </a>
            </Link> */}
        </div>
      </Link>
)};

interface ProjectSectionProp {
  projects: Project[];
}

const ProjectSection: FC<ProjectSectionProp> = ({ projects }) => {
  return (
    <div
      className="w-full flex flex-wrap justify-start content gap-10 mt-1 px-8 sm:px-20 md:px-24 2xl:px-56"
    >
      {projects.map((project) => (
        <ProjectCardProp
          key={project.proj_id}
          proj_id={project.proj_id}
          proj_name={project.proj_name}
          github={project.github}
          hosting={project.hosting}
          proj_img={project.proj_img}
          category={project.category}
          description={project.description}
        />
      ))}
    </div>
  );
};
