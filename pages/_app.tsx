import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
function MyApp({ Component, pageProps }: AppProps) {
	const queryClient = new QueryClient();
	return (
		<>
			<Head>
				<title>Rachmat Nasution</title>
				<meta name="description" content="This is a website for my personal web that contain my introduction, tech stacks, and projects." />
				<link rel="icon" href="/favicon-1.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<ThemeProvider>
				<QueryClientProvider client={queryClient}>
					<Component {...pageProps} />
				</QueryClientProvider>
			</ThemeProvider>
		</>
	);
}

export default MyApp;
