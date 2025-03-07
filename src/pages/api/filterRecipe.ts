

import type { NextApiRequest, NextApiResponse } from "next";
import { RecipeResponses } from './recipe.service';
import { readFile } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponses>,
) {

  const jsonData = await readFile()

  const { isYesFavorites, isNoFavorites } = req.body

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

  res.status(200).json({ data: filteredRecipes });

}
