import Footer from '@components/Layout/Footer';
import Header from '@components/Layout/Header';
import ProjectCategoryIcon from '@components/Project/ProjectCategoryIcon';
import { prisma } from '@root/libs/prisma';
import { Category } from '@root/types/Category';
import { Project } from '@root/types/Project';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import { AiFillGithub } from 'react-icons/ai';
import { IoIosLink } from 'react-icons/io';

interface ProjectDetailsProps {
  project: Project
};
const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  const backgroundImage = project.proj_img || '../../assets/best-placeholder.jpg';
  const icon = <ProjectCategoryIcon category={project.category} classNames='text-4xl'/>;
  
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center">
        {/* Project Image */}
        <img
          className="max-h-80 my-3 rounded-xl hover:scale-105 transition-transform"
          src={backgroundImage}
          alt={project.proj_name || 'project image'}
        />

        {/* Project Name */}
        <h1 className="text-white my-3 text-4xl text-justify w-1/3">
          {project.proj_name}
        </h1>

        {/* Project Description */}
        <p className="text-white my-3 text-justify w-1/3">
          {project.description}
        </p>

        {/* Buttons Section */}
        <div className="flex flex-col justify-end items-end w-1/3 mt-4 gap-4">
        <div>
          {/* Icon */}
        {icon}
        </div>

        <div className='flex gap-4'>
          {/* GitHub Button */}
          {project.github && (
            <Link href={project.github}>
              <button className="flex items-center px-3 py-1 bg-gray-800 text-white bg-pastel-blurple rounded-sm hover:bg-gray-700 transition">
                <span>GitHub Repository</span>
                <AiFillGithub className="ml-2" />
              </button>
            </Link>
          )}

          {/* Hosting Button */}
          {project.hosting && (
            <Link href={project.hosting}>
              <button className="flex items-center px-3 py-1 bg-blue-600 text-white bg-pastel-blurple rounded-sm hover:bg-blue-500 transition">
                <span>Hosting Link</span>
                <IoIosLink className="ml-2" />
              </button>
            </Link>
          )}
        </div>
        </div>
      </div>
      <Footer />
    </>
  );
};


export const getServerSideProps: GetServerSideProps = async (context) => {
  const { proj_id } = context.params as { proj_id: string };

  const project = await prisma.projects.findUnique({
    where: {
      proj_id: parseInt(proj_id, 10)
    }
  });

  console.log(project)

  return {
    props: { project: project},
  };
};

export default ProjectDetails;