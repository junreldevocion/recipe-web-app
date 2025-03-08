

import type { NextApiRequest, NextApiResponse } from "next";
import { RecipeResponses } from './recipe.service';
import { readFile } from "@/lib/utils";

/**
 * API handler to search for recipes based on the provided title.
 * 
 * @param req - The incoming request object, containing the search title in the body.
 * @param res - The outgoing response object, used to send back the filtered recipes.
 * 
 * @returns A JSON response containing the filtered recipes based on the search title.
 * 
 * @remarks
 * This function reads the recipe data from a file and filters the recipes
 * based on the title provided in the request body. If no title is provided,
 * it returns all recipes.
 */
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
