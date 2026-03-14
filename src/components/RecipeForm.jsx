import { useState } from 'react';

function RecipeForm({ onSave, onCancel, initialData }) {
  const [title, setTitle] = useState(initialData?.title || '');
  const [ingredients, setIngredients] = useState(
    initialData?.ingredients?.join(', ') || ''
  );
  const [instructions, setInstructions] = useState(initialData?.instructions || '');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim()) {
      alert('Please enter a recipe title');
      return;
    }

    const recipe = {
      id: initialData?.id || `recipe_${Date.now()}`,
      title: title.trim(),
      ingredients: ingredients
        .split(',')
        .map((i) => i.trim())
        .filter((i) => i),
      instructions: instructions.trim(),
      isFavorite: initialData?.isFavorite || false,
      createdAt: initialData?.createdAt || Date.now(),
    };

    onSave(recipe);
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h2>{initialData ? 'Edit Recipe' : 'Add New Recipe'}</h2>

      <div className="form-group">
        <label htmlFor="title">Recipe Title</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Pasta Carbonara"
        />
      </div>

      <div className="form-group">
        <label htmlFor="ingredients">Ingredients (comma-separated)</label>
        <textarea
          id="ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="e.g., pasta, eggs, bacon, parmesan"
          rows={3}
        />
      </div>

      <div className="form-group">
        <label htmlFor="instructions">Instructions</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Describe how to make this recipe..."
          rows={5}
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-primary">
          {initialData ? 'Save Changes' : 'Add Recipe'}
        </button>
        <button type="button" className="btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default RecipeForm;
