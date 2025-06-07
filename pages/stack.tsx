import { NextPage } from "next";
import Header from "@components/Layout/Header";
import Footer from "@components/Layout/Footer";
import StackComponent from "@components/Stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { FallingLines } from "react-loader-spinner";


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
                <div className="flex justify-center items-center min-h-[50vh]">
                    <FallingLines
                        color="#7777FF"
                        width="100"
                        visible={true}
                    />
                </div>
            ) : error ? (
                <div className="flex justify-center items-center min-h-[50vh]">
                    <p className="text-center text-red-500 text-lg">Error loading stacks</p>
                </div>
            ) : (
                <StackComponent stacks={stacks ?? []} />
            )}
            <Footer />
        </div>
    );
};


export default Stack;
