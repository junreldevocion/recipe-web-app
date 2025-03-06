

import type { NextApiRequest, NextApiResponse } from "next";
import { addRecipe, getRecipies, RecipeResponses, removeRecipe, updateRecipe } from './recipe.service';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponses>,
) {

  if (req.method === 'GET') {
    await getRecipies(res)
  }

  if (req.method === 'POST') {
    await addRecipe(req, res)
  }

  if (req.method === 'DELETE') {
    await removeRecipe(req, res)
  }

  if (req.method === 'PUT') {
    await updateRecipe(req, res)
  }

}
