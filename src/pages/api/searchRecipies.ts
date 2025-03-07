

import type { NextApiRequest, NextApiResponse } from "next";
import { RecipeResponses } from './recipe.service';
import { readFile } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponses>,
) {

  const { title } = req.body;

  let jsonData = await readFile()

  if (title) {
    jsonData = jsonData.filter((recipe: { title: string }) => {
      return recipe.title.toLowerCase().includes((title as string).toLowerCase())
    });
  }

  res.status(200).json({ data: jsonData });

}
