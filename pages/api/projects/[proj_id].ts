import { prisma } from "@root/libs/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const { proj_id } = req.query;

	if (!proj_id || isNaN(Number(proj_id))) {
		return res.status(400).json({ error: "Invalid project ID" });
	}

	try {
		const project = await prisma.projects.findUnique({
			where: { proj_id: Number(proj_id) },
		});

		if (!project) {
			return res.status(404).json({ error: "Project not found" });
		}

		res.status(200).json(project);
	} catch (error) {
		console.error("Error fetching project:", error);
		res.status(500).json({ error: "Failed to fetch project details" });
	}
}
