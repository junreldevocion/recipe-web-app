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
