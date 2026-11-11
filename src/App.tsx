import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import Search from "./components/Search";
import type { Recipe } from "./types/Recipe";
import "./App.css";

function App() {
  // The recipes live here so both the form and the list can use them
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      fetch("/api/recipes")
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(setRecipes)
        .catch((err) => setError(err.message));
    }, []);

  return (
    <>
      <Navbar />
      <div className="container">
        {error && <div className="alert alert-danger">Couldn't load recipes: {error}</div>}
        <Routes>
          <Route path="/" element={<Menu recipes={recipes} />} />
          <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
          <Route
            path="/recipes/new"
            element={
              <RecipeForm
                onCreated={(recipe) => setRecipes((prev) => [...prev, recipe])}
              />
            }
          />
          <Route path="/search" element={<Search />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
