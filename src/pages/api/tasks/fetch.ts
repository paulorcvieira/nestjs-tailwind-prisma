import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function fetch(req: NextApiRequest, res: NextApiResponse) {
  const data = await prisma.task.findMany();

  return res.status(200).json({ tasks: data });
}