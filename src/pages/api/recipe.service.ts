import { readFile } from "@/lib/utils";
import { Recipe } from "@/model/recepi.model";
import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from 'fs';
import { DATA_FILE_PATH } from "@/constant";


export type RecipeResponses = {
  data?: Recipe[];
  error?: unknown;
  message?: string
}


export const getRecipies = async (res: NextApiResponse<RecipeResponses>) => {
  try {
    const data = await readFile()
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const addRecipe = async (req: NextApiRequest, res: NextApiResponse<RecipeResponses>) => {
  try {

    const jsonData = await readFile();
    const newData = req.body
    jsonData.push(newData)

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData))
    res.status(200).json({ message: 'Date stored successfulle' });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const removeRecipe = async (req: NextApiRequest, res: NextApiResponse<RecipeResponses>) => {
  try {

    const { id } = req.body
    const jsonData = await readFile();
    const updatedData = jsonData.filter((recipe: Recipe) => recipe.id !== id);
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedData));
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
}

export const updateRecipe = async (req: NextApiRequest, res: NextApiResponse<RecipeResponses>) => {
  try {

    const { id } = req.body
    const jsonData = await readFile();
    const updatedData = jsonData.map((recipe: Recipe) =>
      recipe.id === id ? { ...recipe, ...req.body } : recipe
    );
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedData));
    res.status(200).json({ message: 'Updated successfully' });
  } catch (error) {
    res.status(500).json({ error });
  }
}