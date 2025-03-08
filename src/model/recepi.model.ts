export interface Recipe {
  id: number;
  name: 'string';
  imageUrl: string;
  email: string;
  title: string;
  instructions: string;
  favorite: boolean
  createdAt: Date;
  updatedAt: Date;
}