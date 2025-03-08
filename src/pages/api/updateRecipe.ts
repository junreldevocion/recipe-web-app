// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { DATA_FILE_PATH, UPLOAD_DIR } from "@/constant";
import { Recipe } from "@/model/recepi.model";
import formidable from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import { RecipeResponses } from "./recipe.service";
import fs, { promises as promisesFS } from 'fs';
import { readFile } from "@/lib/utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

const updateRecipe = async (fields: Recipe) => {
  const jsonData = await readFile()
  const updatedData = jsonData.map((recipe: Recipe) => {
    return recipe.id === Number(fields?.id) ? { ...recipe, ...fields, id: Number(fields.id) } : recipe
  })

  await promisesFS.writeFile(DATA_FILE_PATH, JSON.stringify(updatedData));
  return updatedData
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeResponses>,
) {
  const form = formidable({
    uploadDir: UPLOAD_DIR,
    keepExtensions: true,
    createDirsFromUploads: false
  });

  form.parse(req, async (err, fields, files) => {

    if (err) {
      return res.status(500).json({ message: 'Error parsing the files' });
    }

    const file = Array.isArray(files.file) ? files.file[0] : files.file;
    if (!file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const imageType = (file?.filepath ?? '').split('.').at(-1)

    const fileName = `${fields?.title?.[0]}.${imageType}`
    const filePath = path.join(UPLOAD_DIR, fileName);

    const extractFields = {
      id: fields?.id?.[0],
      title: fields?.title?.[0],
      name: fields?.name?.[0],
      email: fields?.email?.[0],
      instructions: fields?.instructions?.[0],
      imageUrl: fileName
    }

    fs.rename(file.filepath, filePath, async (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving the file' });
      }
      const data = await updateRecipe(extractFields as unknown as Recipe)
      return res.status(200).json({ message: 'Updated succesfully', data });
    });

  });
}
