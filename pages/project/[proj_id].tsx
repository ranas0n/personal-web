import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import Footer from "@components/Layout/Footer";
import Header from "@components/Layout/Header";
import ProjectCategoryIcon from "@components/Project/ProjectCategoryIcon";
import { AiFillGithub } from "react-icons/ai";
import { IoIosLink } from "react-icons/io";
import { ThreeDots } from "react-loader-spinner";

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
        enabled: !!proj_id,
    });

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {isLoading ? (
                    <div className="flex flex-col justify-center items-center min-h-[80vh]">
                        <ThreeDots
                            visible={true}
                            height="80"
                            width="80"
                            color="#7777FF"
                            radius="9"
                            ariaLabel="three-dots-loading"
                        />
                        <p className="mt-6 text-gray-400 text-lg animate-pulse">Loading project details...</p>
                    </div>
                ) : error || !project ? (
                    <div className="flex flex-col justify-center items-center min-h-[80vh] px-4">
                        <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur-sm p-8 rounded-2xl border border-red-700/50 text-center max-w-md shadow-2xl">
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-red-300 text-xl font-semibold mb-2">Project Not Found</p>
                            <p className="text-red-400/80 text-sm">Unable to load project details</p>
                        </div>
                    </div>
                ) : (
                    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                        <button
                            onClick={() => router.back()}
                            className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all duration-300 mb-8 hover:gap-3"
                        >
                            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                            <span className="font-medium">Back to Projects</span>
                        </button>

                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />
                            
                            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50">
                                <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden">
                                    <img
                                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
                                        src={project.proj_img || "../../assets/best-placeholder.jpg"}
                                        alt={project.proj_name || "Project image"}
                                    />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-transparent" />
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-pink-900/20" />
                                    
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-[-200%] animate-shine" />
                                    
                                    <div className="absolute bottom-8 right-8 group">
                                        <div className="absolute inset-0 bg-purple-500/30 rounded-2xl blur-xl group-hover:bg-purple-500/50 transition-all duration-300" />
                                        <div className="relative bg-gray-900/90 backdrop-blur-md p-6 rounded-2xl border border-gray-700/50 shadow-2xl hover:border-purple-500/50 transition-all duration-300">
                                            <ProjectCategoryIcon category={project.category} classNames="text-6xl" />
                                        </div>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                                        <h1 className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight drop-shadow-2xl">
                                            {project.proj_name}
                                        </h1>
                                        
                                        <div className="inline-flex items-center gap-3 bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 px-5 py-3 rounded-xl shadow-lg">
                                            <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                                            <span className="text-gray-200 font-semibold text-lg">{project.category}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 md:p-12 space-y-8">
                                    <div className="relative">
                                        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-2xl opacity-20 blur" />
                                        <div className="relative bg-gray-800/60 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 md:p-10">
                                            <div className="flex items-center gap-3 mb-4">
                                                <div className="h-1 w-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
                                                <h2 className="text-gray-400 text-sm font-bold uppercase tracking-wider">Project Overview</h2>
                                            </div>
                                            <p className="text-gray-200 text-xl md:text-2xl leading-relaxed font-light">
                                                {project.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                        {project.github && (
                                            <a 
                                                href={project.github} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                                className="flex-1"
                                            >
                                                <button className="relative w-full group overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-800 transition-transform duration-300 group-hover:scale-105" />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-gray-600 to-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    
                                                    <div className="relative flex items-center justify-center gap-3 px-8 py-5 text-white rounded-xl border border-gray-600 group-hover:border-gray-500 transition-all duration-300">
                                                        <AiFillGithub className="text-2xl group-hover:rotate-12 transition-transform duration-300" />
                                                        <span className="font-bold text-lg">View Repository</span>
                                                    </div>
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
                                                <button className="relative w-full group overflow-hidden">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-transform duration-300 group-hover:scale-105" />
                                                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                    
                                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700" />
                                                    
                                                    <div className="relative flex items-center justify-center gap-3 px-8 py-5 text-white rounded-xl">
                                                        <IoIosLink className="text-2xl group-hover:scale-110 transition-transform duration-300" />
                                                        <span className="font-bold text-lg">Launch Live Demo</span>
                                                    </div>
                                                </button>
                                            </a>
                                        )}
                                    </div>

                                    {!project.github && !project.hosting && (
                                        <div className="relative overflow-hidden rounded-2xl">
                                            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 via-red-500/20 to-orange-500/20 animate-pulse" />
                                            <div className="relative bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-2xl p-8 text-center backdrop-blur-sm">
                                                <div className="text-5xl mb-4">🚧</div>
                                                <p className="text-orange-200 font-bold text-xl mb-2">
                                                    Work in Progress
                                                </p>
                                                <p className="text-orange-300/80">
                                                    This project is currently under active development
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
};

export default ProjectDetails;