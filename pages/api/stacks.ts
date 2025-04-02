import { prisma } from "@root/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function (req: NextApiRequest, res: NextApiResponse) {
	try {
		const stacks = await prisma.stack.findMany();
		res.status(200).json(stacks);
	} catch (error) {
		res.status(500).json({
			error: "Failed to fetch the stack data.",
		});
	}
}
