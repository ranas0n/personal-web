import { StatArrowProps } from "@chakra-ui/react";
import Highlight from "@components/Highlight";
import { Stackprop } from "@root/types/Stack";
import { motion } from "framer-motion";
import { FC } from "react";


export const Stack: FC<{stacks: Stackprop[]}> = ({stacks}) => {
    return (
        <div>
            <div className="flex flex-col items-center text-white w-10/12 mx-auto">
                <h1 className="text-center text-3xl tracking-tightest">
                    Tech stacks I use
                </h1>
                <p className="text-justify mt-4">
                    Here's the tech stack I have used to build my projects.
                </p>
            </div>

            <StackSection stacks={stacks} />

            <div className="w-full"></div>
        </div>
    );
};

interface IStackCard {
    name: string;
    logo: string;
    lang: any;
}

const StackCard = ({ name, logo, lang }: IStackCard) => {
    return (
        <motion.div
            className={`bg-epic-black-light ${
                lang.hoverColor
            } flex flex-col rounded-md h-40`}
            whileHover={{ y: -5 }}
            onClick={() => {
                if(lang.href) window.location.href = lang.href;
            }}
        >
            <img
                src={`${logo ? logo : 'placeholder.png'}`}
                className="w-20 h-20 mx-auto mt-6 rounded-md"
            ></img>
            <p className="mx-auto my-auto text-white">{name}</p>
        </motion.div>
    );
};

interface StackSectionProp {
    stacks: Stackprop[];
}

const StackSection = ({ stacks }: StackSectionProp) => {
	console.log(stacks);
    return (
        <div
            className="w-full grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-5 gap-4 mt-8 md:mt-8
                px-8 sm:px-20 md:px-24 2xl:px-56"
        >
            {stacks.map((stack) => (
                    <div key={stack.id}>
                        <StackCard
                            name={stack.name}
                            logo={stack.logo ?? ''}
                            lang={stack}
                        />
                    </div>
                ))}
        </div>
    );
}

export default Stack;
