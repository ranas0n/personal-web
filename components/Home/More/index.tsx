import Highlight from "@components/Highlight";
import useMediaQuery from "@utils/useMediaQuery";
import { motion } from "framer-motion";
import { FC } from "react";

export const More: FC = () => {
	return (
		<div className="w-full flex flex-col md:flex-row text-center md:text-right mt-8">
			<div className="w-1/5 lg:w-1/2 px-8 sm:px-20 md:px-24 md:pt-28 2xl:pl-56 flex flex-row relative">
				{!useMediaQuery(1024) && (
					<>
						<motion.img
							src={"./assets/mecca.jpg"}
							className="w-80 rounded-lg my-auto mt-16 absolute bottom-0"
							whileHover={{ scale: 1.25 }}
						/>
					</>
				)}
				{!useMediaQuery(1200) && (
					<motion.img
						src={"./assets/scene.jpeg"}
						className="w-72 h-56 mt-[180px] rounded-lg -ml-20 absolute -bottom-8 right-8 shadow-lg shadow-pastel-black"
						whileHover={{ scale: 1.5 }}
					/>
				)}
			</div>
			<div
				className="flex flex-col 
				w-full md:w-2/3 lg:w-3/5 custom-md:w-1/2
				px-8 sm:px-20 md:px-24 2xl:pr-56 pt-28
				text-white"
			>
				<h1 className="text-6xl tracking-[-5px] font-bold">
					Away From <Highlight>Keyboard</Highlight>?
				</h1>
				<p className="mt-4 text-justify md:text-end">
				Outside <Highlight>work</Highlight>, I also enjoy a variety of activities and hobbies. I like to spend time reading both fiction and non-fiction <Highlight>books</Highlight>, reading <Highlight>articles</Highlight> on a topics that caught my interest, play both single-player and multi-player <Highlight>video games</Highlight>, watching <Highlight>movies</Highlight>. and hanging out with my <Highlight>friends and family</Highlight>.
				</p>
				{useMediaQuery(767) && (
					<div className="flex flex-row relative">
						<img
							src={"./assets/mecca.jpg"}
							className="w-72 mt-16 rounded-lg mx-auto shadow-lg shadow-pastel-black flex flex-row"
						/>
						
					</div>
				)}
			</div>
		</div>
	);
};

export default More;
