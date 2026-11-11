import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import RecipeList from "./RecipeList";
import type { Recipe } from "../types/Recipe";

  const emptyFilters = { name: "", category: "", ingredient: "" };

  function Search() {
    const [filters, setFilters] = useState(emptyFilters);
    const [results, setResults] = useState<Recipe[]>([]);
    const [searched, setSearched] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
      setFilters({ ...filters, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: FormEvent) {
      e.preventDefault();
      setLoading(true);
      setError(null);

      // Only send the filters that were filled in, e.g. ?category=Dessert&ingredient=eggs
      const params = new URLSearchParams();
      if (filters.name.trim()) params.set("name", filters.name.trim());
      if (filters.category.trim()) params.set("category", filters.category.trim());
      if (filters.ingredient.trim()) params.set("ingredient", filters.ingredient.trim());

      try {
        const res = await fetch(`/api/recipes?${params}`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setResults(await res.json());
        setSearched(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    function handleClear() {
      setFilters(emptyFilters);
      setResults([]);
      setSearched(false);
    }

    return (
      <>
        <form onSubmit={handleSubmit} className="card card-body mb-4">
          <h2 className="h4">Search recipes</h2>

          {error && <div className="alert alert-danger">Search failed: {error}</div>}

          <div className="row g-3 mb-3">
            <div className="col-md-4">
              <label htmlFor="name" className="form-label">Name</label>
              <input id="name" name="name" className="form-control"
                     value={filters.name} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="category" className="form-label">Category</label>
              <input id="category" name="category" className="form-control"
                     placeholder="Breakfast, Dessert..."
                     value={filters.category} onChange={handleChange} />
            </div>
            <div className="col-md-4">
              <label htmlFor="ingredient" className="form-label">Ingredient</label>
              <input id="ingredient" name="ingredient" className="form-control"
                     placeholder="eggs"
                     value={filters.ingredient} onChange={handleChange} />
            </div>
          </div>

          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary" disabled={loading}
                    style={{ backgroundColor: "#7d1600", borderColor: "#7d1600" }}>
              {loading ? "Searching..." : "Search"}
            </button>
            <button type="button" className="btn btn-outline-secondary" onClick={handleClear}>
              Clear
            </button>
          </div>
        </form>

        {searched && <RecipeList recipes={results} />}
      </>
    );
  }

  export default Search;