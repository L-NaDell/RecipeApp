# Recipe App

A React front end for a family recipe box. It lists saved recipes and has a form for adding new ones. Recipes are stored by the companion [RecipeAPI](../RecipeAPI) project.

Built with **React**, **TypeScript**, **Vite** and **Bootstrap**.

## TO DO

- Edit recipes
- Search by name, category, or ingredient
- Browse categories
- Recipe should just be a card with name and evenutally picture. Selecting it shows info.
- Weekly Menu
- Shopping list
- Set up in Docker

## Running it

1. Start RecipeAPI with the **http** profile. It runs at `http://localhost:5110`.
2. In this folder, install packages (first time only) and start the dev server:

   ```
   npm install
   npm run dev
   ```

3. Open `http://localhost:5173`.

While `npm run dev` is running, Vite forwards any request to `/api/...` to the API (set up in `vite.config.ts`).

## Project structure

```
src/
├── App.tsx                  # Loads recipes from the API and shows the form and list
├── components/
│   ├── RecipeForm.tsx       # Form for adding a recipe
│   └── RecipeList.tsx       # Displays the recipes
└── types/
    └── Recipe.ts            # Recipe type, matching the API's Recipe model
```
