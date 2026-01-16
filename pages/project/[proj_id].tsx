import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "@components/Layout/PageLayout";
import ProjectCategoryIcon from "@components/Project/ProjectCategoryIcon";
import { AiFillGithub } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";
import LoadingSpinner from "@components/UI/LoadingSpinner";
import ErrorDisplay from "@components/UI/ErrorDisplay";

const fetchProject = async (proj_id: string) => {
    const res = await fetch(`/api/projects/${proj_id}`);

    if (!res.ok) {
        throw new Error("Failed to fetch project data.");
    }

    return res.json();
};

const ProjectDetails: React.FC = () => {
    const router = useRouter();
    const { proj_id } = router.query;

    const { data: project, error, isLoading } = useQuery({
        queryKey: ["project", proj_id],
        queryFn: () => fetchProject(proj_id as string),
        enabled: !!proj_id,
    });

    return (
        <PageLayout>
            <div className="w-full pb-16">
                <div className="flex flex-col w-10/12 mx-auto">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 mb-8 w-fit"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Back to Projects</span>
                    </button>

                    {isLoading ? (
                        <LoadingSpinner className="min-h-[40vh]" />
                    ) : error || !project ? (
                        <ErrorDisplay
                            title="Project Not Found"
                            message="Unable to load project details"
                        />
                    ) : (
                        <div className="space-y-8">
                            <div className="text-center">
                                <h1 className="text-3xl font-bold text-white mb-4">
                                    {project.proj_name}
                                </h1>
                                <p className="text-gray-400 text-lg">
                                    {project.category}
                                </p>
                            </div>

                            {project.proj_img && (
                                <div className="w-full max-w-4xl mx-auto">
                                    <img
                                        src={project.proj_img}
                                        alt={project.proj_name}
                                        className="w-full h-64 md:h-96 object-cover rounded-lg"
                                    />
                                </div>
                            )}

                            <div className="max-w-4xl mx-auto">
                                <h2 className="text-xl font-semibold text-white mb-4">Project Overview</h2>
                                <p className="text-gray-300 text-justify leading-relaxed">
                                    {project.description}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
                                {project.github && (
                                    <a
                                        href={project.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1"
                                    >
                                        <button className="w-full bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-3">
                                            <AiFillGithub className="text-xl" />
                                            <span>View Repository</span>
                                        </button>
                                    </a>
                                )}

                                {project.hosting && (
                                    <a
                                        href={project.hosting}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1"
                                    >
                                        <button className="w-full bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-300 flex items-center justify-center gap-3">
                                            <IoIosLink className="text-xl" />
                                            <span>Launch Live Demo</span>
                                        </button>
                                    </a>
                                )}
                            </div>

                            {!project.github && !project.hosting && (
                                <div className="max-w-4xl mx-auto text-center">
                                    <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6">
                                        <div className="text-3xl mb-2">🚧</div>
                                        <p className="text-orange-200 font-medium mb-1">Work in Progress</p>
                                        <p className="text-orange-300/80 text-sm">
                                            This project is currently under active development
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </PageLayout>
    );
};

export default ProjectDetails;