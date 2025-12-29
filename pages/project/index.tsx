import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import { ProjectComponent } from "@components/Project/ProjectComponent";
import { ThreeDots } from "react-loader-spinner";

const fetchProjects = async () => {
    console.log("Fetching project list...");
    const res = await fetch("/api/projects");
    if (!res.ok) {
        console.error("API Error:", await res.text());
        throw new Error("Failed to fetch projects.");
    }
    const data = await res.json();
    console.log("Fetched Projects:", data);
    return data;
};

const Project: NextPage = () => {
    const { data: projects, error, isLoading, refetch } = useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
    });

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <Header />
            
            <div className="relative text-center pt-20 pb-16 px-4">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600/10 via-purple-600/5 to-transparent pointer-events-none" />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                        My Projects
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-400 font-light">
                        Explore the work I've created
                    </p>
                    <div className="mt-8 h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full" />
                </div>
            </div>

            <div className="pb-20">
                {isLoading ? (
                    <div className="flex flex-col justify-center items-center min-h-[60vh] px-4">
                        <ThreeDots
                            visible={true}
                            height="80"
                            width="80"
                            color="#7777FF"
                            radius="9"
                            ariaLabel="three-dots-loading"
                        />
                        <p className="mt-6 text-gray-400 text-lg animate-pulse">Loading projects...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col justify-center items-center min-h-[60vh] px-4">
                        <div className="bg-gradient-to-br from-red-900/40 to-red-800/20 backdrop-blur-sm p-8 rounded-2xl border border-red-700/50 text-center max-w-md shadow-2xl">
                            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-red-300 text-xl font-semibold mb-6">Failed to load projects</p>
                            <button 
                                onClick={() => refetch()} 
                                className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                ) : (
                    <ProjectComponent projects={projects} />
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Project;