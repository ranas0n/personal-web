import { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import { ProjectComponent } from "@components/Project/ProjectComponent";

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
                <p>
                    Loading Projects
                </p>
            ):
            error ? (
                <p>
                    Error loading projects
                </p>
            ):
            (<ProjectComponent projects={projects} />)
            }
            <Footer />
        </div>
    );
};

export default Project;
