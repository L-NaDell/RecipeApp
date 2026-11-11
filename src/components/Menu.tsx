import type { Recipe } from "../types/Recipe";

interface RecipeListProps {
  recipes: Recipe[];
}

// this is placeholder code from RecipeList. Make into a table that shows every day and every meal. Drag/drop? Dropdown?
function RecipeList({ recipes }: RecipeListProps) {
  return (
    <>
      <h1 style={{textDecoration: 'underline', color: 'white', textAlign: 'center'}}>This Week:</h1>
      {recipes.length === 0 && <p>No recipes yet.</p>}
      <ul className="list-group">
        {recipes.map((r) => (
          <li key={r.id} className="list-group-item">
            <strong>{r.name}</strong>{" "}
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecipeList;