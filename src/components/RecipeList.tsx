import type { Recipe } from "../types/Recipe";

interface RecipeListProps {
  recipes: Recipe[];
}

// Only displays recipes; App loads them and passes them in
//TO DO: pagination. Clicking on item shold also bring the rest of the info and let you edit
function RecipeList({ recipes }: RecipeListProps) {
  return (
    <>
      <h1 style={{textDecoration: 'underline', color: 'white', textAlign: 'center', textDecorationColor: '#043023'}}>Recipes</h1>
      {recipes.length === 0 && <p>No recipes yet.</p>}
      <ul className="list-group">
        {recipes.map((r) => (
          <li key={r.id} className="list-group-item">
            <strong>{r.name}</strong>{" "}
            {r.description && <div>{r.description}</div>}
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecipeList;
