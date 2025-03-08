

import type { NextApiRequest, NextApiResponse } from "next";
import { getRecipies, RecipeResponses, removeRecipe } from './recipe.service';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponses>,
) {

  if (req.method === 'GET') {
    await getRecipies(res)
  }

  if (req.method === 'DELETE') {
    await removeRecipe(req, res)
  }

}
