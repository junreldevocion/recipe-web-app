export interface Recipe {
  id: number;
  imagePath: string;
  email: string;
  title: string;
  instructions: string;
  dateAdded: Date;
  isFavorite: boolean
}