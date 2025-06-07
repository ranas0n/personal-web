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
    const { data: projects, error, isLoading } = useQuery({
        queryKey: ["projects"],
        queryFn: fetchProjects,
    });

    return (
        <div className="relative">
            <Header />
            {isLoading ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <ThreeDots
                        visible={true}
                        height="80"
                        width="80"
                        color="#7777FF"
                        radius="9"
                        ariaLabel="three-dots-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : error ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <p className="text-center text-red-500 text-lg">Error loading projects</p>
                </div>
            ) : (
                <ProjectComponent projects={projects} />
            )}
            <Footer />
        </div>
    );
};

export default Project;
