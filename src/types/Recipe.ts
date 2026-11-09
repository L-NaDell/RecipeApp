// Matches RecipeAPI/Models/Recipe.cs (ASP.NET Core sends property names in camelCase)
export interface Recipe {
  id: number;
  name: string;
  category?: string;
  description?: string;
  ingredients?: string;
}
