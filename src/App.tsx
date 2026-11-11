import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import RecipeForm from "./components/RecipeForm";
import RecipeList from "./components/RecipeList";
import type { Recipe } from "./types/Recipe";
import "./App.css";

function App() {
  // The recipes live here so both the form and the list can use them
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Menu recipes={recipes} />} />
          <Route path="/recipes" element={<RecipeList recipes={recipes} />} />
          <Route
            path="/recipes/new"
            element={
              <RecipeForm
                onCreated={(recipe) => setRecipes([...recipes, recipe])}
              />
            }
          />
          <Route path="/search" element={<p>Search coming soon</p>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
