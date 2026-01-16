import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "@components/Layout/PageLayout";
import { ProjectComponent } from "@components/Project/ProjectComponent";
import LoadingSpinner from "@components/UI/LoadingSpinner";
import ErrorDisplay from "@components/UI/ErrorDisplay";

const fetchProjects = async () => {
    const res = await fetch("/api/projects");
    if (!res.ok) {
        throw new Error("Failed to fetch projects.");
    }
    return res.json();
};

const Project: NextPage = () => {
    const { data: projects, error, isLoading, refetch } = useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
    });

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <PageLayout>
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
                        <LoadingSpinner className="min-h-[60vh]" />
                    ) : error ? (
                        <ErrorDisplay
                            title="Failed to load projects"
                            showRetry
                            onRetry={() => refetch()}
                        />
                    ) : (
                        <ProjectComponent projects={projects} />
                    )}
                </div>
            </PageLayout>
        </div>
    );
};

export default Project;