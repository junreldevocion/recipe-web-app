

import type { NextApiRequest, NextApiResponse } from "next";
import { RecipeResponses } from './recipe.service';
import { readFile } from "@/lib/utils";


// API handler to filter recipes based on favorite status
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponses>,
) {
  // Read the JSON data from the file
  const jsonData = await readFile();

  // Extract the favorite filters from the request body
  const { isYesFavorites, isNoFavorites } = req.body;

  // Filter the recipes based on the favorite status
  const filteredRecipes = jsonData.filter((recipe) => {
    if (isYesFavorites && isNoFavorites) {
      return true; // If both are true, return all recipes
    } else if (isNoFavorites) {
      return !recipe.favorite; // If favoriteNo is true, return non-favorite recipes
    } else if (isYesFavorites) {
      return recipe.favorite; // If favoriteYes is true, return favorite recipes
    } else {
      return true; // If neither is true, return all recipes
    }
  });

  // Send the filtered recipes as the response
  res.status(200).json({ data: filteredRecipes });
}
