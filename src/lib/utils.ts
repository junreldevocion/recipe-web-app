import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import { promises as fs } from 'fs';
import { Recipe } from "@/model/recepi.model";
import { DATA_FILE_PATH } from "@/constant";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function readFile() {
  const file = await fs.readFile(DATA_FILE_PATH, 'utf8');
  const data = JSON.parse(file) as unknown as Recipe[]
  return data
}

export const debounce = (func: (...args: string[]) => void, wait: number) => {
  let timeout: NodeJS.Timeout;
  return (...args: string[]) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};

export const blobUrlToFile = (blobUrl: string, fileName: string): Promise<File> => new Promise((resolve) => {
  fetch(blobUrl).then((res) => {
    res.blob().then((blob) => {
      // please change the file.extension with something more meaningful
      // or create a utility function to parse from URL
      const file = new File([blob], fileName, { type: blob.type })
      resolve(file)
    })
  })
})
