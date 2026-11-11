import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Recipe } from "../types/Recipe";

interface RecipeFormProps {
  onCreated: (recipe: Recipe) => void;
}

const emptyForm = { name: "", category: "", description: "", ingredients: "" };

function RecipeForm({ onCreated }: RecipeFormProps) {
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // One change handler for every input: uses the input's "name" to pick the field
  function handleChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault(); // stop the browser from reloading the page

    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      const res = await fetch("/api/recipes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          // Send blank optional fields as null rather than ""
          category: form.category.trim() || null,
          description: form.description.trim() || null,
          ingredients: form.ingredients.trim() || null,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const created: Recipe = await res.json(); // API returns the saved recipe, including its new id
      onCreated(created);
      setForm(emptyForm);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card card-body mb-4">
      <h2 className="h4">Add a recipe</h2>

      {error && <div className="alert alert-danger">Couldn't save recipe: {error}</div>}

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input id="name" name="name" className="form-control" required
               value={form.name} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <input id="category" name="category" className="form-control"
               placeholder="Breakfast, Dessert..."
               value={form.category} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea id="description" name="description" className="form-control" rows={2}
                  value={form.description} onChange={handleChange} />
      </div>

      <div className="mb-3">
        <label htmlFor="ingredients" className="form-label">Ingredients</label>
        <input id="ingredients" name="ingredients" className="form-control"
               placeholder="flour, eggs, milk"
               value={form.ingredients} onChange={handleChange} />
        <div className="form-text">Separate ingredients with commas.</div>
      </div>

      <button type="submit" className="btn btn-primary" disabled={saving} style={{backgroundColor: '#7d1600', borderBlockColor: '#7d1600c7'}}>
        {saving ? "Saving..." : "Add recipe"}
      </button>
    </form>
  );
}

export default RecipeForm;
