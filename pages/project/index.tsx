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
        <PageLayout>
            <div className="w-full pb-16">
                <div className="flex flex-col items-center text-white w-10/12 mx-auto">
                    <h1 className="text-center text-3xl tracking-tightest mb-4">
                        My Projects
                    </h1>
                    <p className="text-justify text-gray-400">
                        Explore the work I've created and contributed to.
                    </p>
                </div>

                <div className="mt-12">
                    {isLoading ? (
                        <LoadingSpinner className="min-h-[40vh]" />
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
            </div>
        </PageLayout>
    );
};

export default Project;