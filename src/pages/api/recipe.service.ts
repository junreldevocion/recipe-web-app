import { readFile } from "@/lib/utils";
import { Recipe } from "@/model/recepi.model";
import { NextApiRequest, NextApiResponse } from "next";
import { promises as fs } from 'fs';
import { DATA_FILE_PATH, UPLOAD_DIR } from "@/constant";


export type RecipeResponses = {
  data?: Recipe[];
  error?: unknown;
  message?: string
}


export const getRecipies = async (res: NextApiResponse<RecipeResponses>) => {
  try {
    const data = await readFile()

    const sortedData = [...(data ?? [])].sort((a, b) => {
      return a.title.localeCompare(b.title)
    })
    res.status(200).json({ data: sortedData });
  } catch (error) {
    res.status(500).json({ error });
  }
}

const removeImagePath = async (dir: string) => {
  try {
    await fs.access(dir)
    await fs.unlink(dir);
  } catch (e) {
    console.error(e)
  }
}

/**
 * Removes a recipe from the data store.
 *
 * @param req - The Next.js API request object, containing the recipe ID in the body.
 * @param res - The Next.js API response object, used to send the response.
 *
 * @returns A promise that resolves to void.
 *
 * @throws Will return a 404 status if the recipe is not found.
 * @throws Will return a 500 status if there is an error during the process.
 *
 * The function performs the following steps:
 * 1. Extracts the recipe ID from the request body.
 * 2. Reads the current data from the data file.
 * 3. Searches for the recipe to remove by ID.
 * 4. If the recipe is not found, responds with a 404 status and a "Recipe not found" message.
 * 5. Filters out the recipe to be removed from the data.
 * 6. Constructs the path to the recipe's image and removes the image file.
 * 7. Writes the updated data back to the data file.
 * 8. Responds with a 200 status and a "Deleted successfully" message.
 * 9. Catches and logs any errors, responding with a 500 status and the error message.
 */
export const removeRecipe = async (req: NextApiRequest, res: NextApiResponse<RecipeResponses>) => {
  try {

    const { id } = req.body
    const jsonData = await readFile();
    const recipeToRemove = jsonData.find((recipe: Recipe) => recipe.id === id);

    if (!recipeToRemove) {
      res.status(404).json({ message: 'Recipe not found' });
      return;
    }

    const updatedData = jsonData.filter((recipe: Recipe) => recipe.id !== id);

    const imagePath = `${UPLOAD_DIR}/${recipeToRemove.imageUrl}`;

    await removeImagePath(imagePath) // remove image

    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(updatedData));

    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.log(error, 'error')
    res.status(500).json({ error });
  }
}