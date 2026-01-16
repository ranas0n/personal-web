import { NextPage } from "next";
import PageLayout from "@components/Layout/PageLayout";
import StackComponent from "@components/Stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "@components/UI/LoadingSpinner";
import ErrorDisplay from "@components/UI/ErrorDisplay";


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
        <PageLayout>
            {isLoading || isFetching ? (
                <LoadingSpinner type="falling-lines" size="100" className="min-h-[50vh]" />
            ) : error ? (
                <ErrorDisplay title="Error loading stacks" />
            ) : (
                <StackComponent stacks={stacks ?? []} />
            )}
        </PageLayout>
    );
};


export default Stack;
