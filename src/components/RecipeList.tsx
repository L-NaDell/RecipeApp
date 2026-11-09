import type { Recipe } from "../types/Recipe";

interface RecipeListProps {
  recipes: Recipe[];
}

// Only displays recipes; App loads them and passes them in
function RecipeList({ recipes }: RecipeListProps) {
  return (
    <>
      <h1>Recipes</h1>
      {recipes.length === 0 && <p>No recipes yet.</p>}
      <ul className="list-group">
        {recipes.map((r) => (
          <li key={r.id} className="list-group-item">
            <strong>{r.name}</strong>{" "}
            {r.category && <span className="badge bg-secondary">{r.category}</span>}
            {r.description && <div>{r.description}</div>}
            {r.ingredients && <div className="small text-muted">{r.ingredients}</div>}
          </li>
        ))}
      </ul>
    </>
  );
}

export default RecipeList;
