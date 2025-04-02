import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import ProjectCategoryIcon from "@components/Project/ProjectCategoryIcon";
import { AiFillGithub } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";

const fetchProject = async (proj_id: string) => {
    console.log("Fetching project details...");
    const res = await fetch(`/api/projects/${proj_id}`);

    if (!res.ok) {
        console.error("API Error:", await res.text());
        throw new Error("Failed to fetch project data.");
    }

    const data = await res.json();
    console.log("Fetched Project Data:", data);
    return data;
};

const ProjectDetails: React.FC = () => {
    const router = useRouter();
    const { proj_id } = router.query;

    const { data: project, error, isLoading } = useQuery({
        queryKey: ["project", proj_id],
        queryFn: () => fetchProject(proj_id as string),
        enabled: !!proj_id, // Ensure query runs only when proj_id is available
    });

    if (isLoading) return <p>Loading project...</p>;
    if (error || !project) return <p>Error loading project or project not found.</p>;

    const backgroundImage = project.proj_img || "../../assets/best-placeholder.jpg";
    const icon = <ProjectCategoryIcon category={project.category} classNames="text-4xl" />;

    return (
        <>
            <Header />
            <div className="flex flex-col justify-center items-center">
                {/* Project Image */}
                <img
                    className="max-h-80 my-3 rounded-xl hover:scale-105 transition-transform"
                    src={backgroundImage}
                    alt={project.proj_name || "project image"}
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
                    <div>{icon}</div>

                    <div className="flex gap-4">
                        {/* GitHub Button */}
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer">
                                <button className="flex items-center px-3 py-1 bg-gray-800 text-white bg-pastel-blurple rounded-sm hover:bg-gray-700 transition">
                                    <span>GitHub Repository</span>
                                    <AiFillGithub className="ml-2" />
                                </button>
                            </a>
                        )}

                        {/* Hosting Button */}
                        {project.hosting && (
                            <a href={project.hosting} target="_blank" rel="noopener noreferrer">
                                <button className="flex items-center px-3 py-1 bg-blue-600 text-white bg-pastel-blurple rounded-sm hover:bg-blue-500 transition">
                                    <span>Hosting Link</span>
                                    <IoIosLink className="ml-2" />
                                </button>
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default ProjectDetails;
