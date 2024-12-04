import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import Head from "next/head";
import "@styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<title>Rachmat Nasution</title>
				<meta name="description" content="This is a website for my personal web that contain my introduction, tech stacks, and projects." />
				<link rel="icon" href="/favicon-1.png" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</>
	);
}

export default MyApp;
