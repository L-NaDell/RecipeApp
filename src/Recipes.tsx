import { useEffect, useState } from 'react';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import type { Recipe } from './types/Recipe';
import './App.css';

function App() {
  // The recipes live here so both the form and the list can use them
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  // this is the list of recipes? I think
  useEffect(() => {
    fetch('/api/recipes')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(setRecipes)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="container mt-4">
        // this is the form
      <RecipeForm onCreated={(recipe) => setRecipes([...recipes, recipe])} />
      {error
        ? <div className="alert alert-danger">Couldn't load recipes: {error}</div>
        : <RecipeList recipes={recipes} />}
    </div>
  );
}

export default App;
