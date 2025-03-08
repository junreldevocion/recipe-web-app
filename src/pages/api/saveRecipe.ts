import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs, { promises as promisesFS } from 'fs';
import path from 'path';
import { DATA_FILE_PATH, UPLOAD_DIR } from '@/constant';
import { Recipe } from '@/model/recepi.model';
import { readFile } from '@/lib/utils';

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveRecipe = async (fields: Recipe, res: NextApiResponse) => {

  if (!fields.name || !fields.email || !fields.imageUrl || !fields.instructions || !fields.title) {
    return res.status(400).json({ message: 'Missing fields', error: 'Missing fields' });
  }

  const jsonData = await readFile();
  const lastId = ((jsonData ?? []).at(-1)?.id ?? 0) + 1;

  const titleRequest = fields?.title

  const isTitleExist = (jsonData ?? []).find(({ title }) => title.toLowerCase() === titleRequest.toLowerCase());

  if (isTitleExist) {
    return res.status(400).json({ message: 'Title already exists in database!', error: 'title already exists' });
  }

  const currentDate = new Date();
  jsonData.push({ ...fields, title: titleRequest, createdAt: currentDate, updatedAt: currentDate, id: lastId });
  promisesFS.writeFile(DATA_FILE_PATH, JSON.stringify(jsonData));

  return res.status(200).json({ message: 'Successfully saved', data: jsonData });
}


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

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
      await saveRecipe(extractFields as unknown as Recipe, res)
    });

  });
};