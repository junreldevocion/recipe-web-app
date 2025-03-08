
import { DATA_FILE_PATH } from "@/constant";
import { readFile } from "@/lib/utils";
import { Recipe } from "@/model/recepi.model";
import type { NextApiRequest, NextApiResponse } from "next";
import { RecipeResponses } from "./recipe.service";
import { promises as fs } from 'fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponses>,
) {

  if (req.method !== 'PUT') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  }

  const { id } = req.query;
  const { favorite } = req.body;

  if (!id || favorite === undefined) {
    res.status(400).json({ message: 'Bad Request: id and favorite fields are required' });
    return;
  }

  const jsonData = await readFile()

  const updatedData = jsonData.map((recipe: Recipe) => {
    return recipe.id === Number(id) ? { ...recipe, favorite } : recipe
  });

  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedData));
  res.status(200).json({ message: 'Updated successfully', data: updatedData });

}
