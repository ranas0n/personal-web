import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import { ProjectCard } from "@components/Project/ProjectCard";

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

    if (isLoading) return <p>Loading projects...</p>;
    if (error || !projects) return <p>Error loading projects.</p>;

    return (
        <div className="relative">
            <Header />
            <ProjectCard projects={projects} />
            <Footer />
        </div>
    );
};

export default Project;
