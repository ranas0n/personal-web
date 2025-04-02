import { NextPage } from "next";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import StackComponent from "@components/Stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";


const fetchStacks = async () => {
    try {
        const res = await fetch("/api/stacks");

        if (!res.ok) {
            console.error("API Error:", await res.text());
            throw new Error("Failed to fetch the stack data.");
        }

        const data = await res.json();
        return data;
    } catch (error) {
        console.error("FetchStacks Error:", error);
        throw error;
    }
};
const Stack: NextPage = () => {
    const { data: stacks, error, isLoading, isFetching } = useQuery({
        queryKey: ["stacks"],
        queryFn: fetchStacks,
        staleTime: 0, 
        retry: 1, 
        refetchOnWindowFocus: false, 
    });
    return (
        <div className="relative">
            <Header />
            {isLoading || isFetching ? (
                <p>Loading...</p>
            ) : error ? (
                <p>Error loading stacks</p>
            ) : (
                <StackComponent stacks={stacks ?? []} />
            )}
            <Footer />
        </div>
    );
};


export default Stack;
