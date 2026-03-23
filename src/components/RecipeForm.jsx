import { useState, useEffect } from 'react';

function RecipeForm({ onSubmit, onCancel, initialData }) {
  const [title, setTitle] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [instructions, setInstructions] = useState('');
  const [cookTime, setCookTime] = useState('');
  const [error, setError] = useState('');

  const isEditing = Boolean(initialData);

  // Populate form when editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setIngredients(initialData.ingredients?.join(', ') || '');
      setInstructions(initialData.instructions || '');
      setCookTime(initialData.cookTime || '');
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim()) {
      setError('Please enter a recipe title');
      return;
    }

    if (!instructions.trim()) {
      setError('Please enter cooking instructions');
      return;
    }

    setError('');

    // Create recipe object
    const recipe = {
      title: title.trim(),
      ingredients: ingredients
        .split(',')
        .map((item) => item.trim())
        .filter((item) => item),
      instructions: instructions.trim(),
      cookTime: cookTime.trim(),
    };

    onSubmit(recipe);

    // Clear form if adding (not editing)
    if (!isEditing) {
      setTitle('');
      setIngredients('');
      setInstructions('');
      setCookTime('');
    }
  };

  return (
    <form className="recipe-form" onSubmit={handleSubmit}>
      <h2>{isEditing ? 'Edit Recipe' : 'Add New Recipe'}</h2>

      {error && <p className="form-error">{error}</p>}

      <div className="form-group">
        <label htmlFor="title">Recipe Title *</label>
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
        <label htmlFor="instructions">Instructions *</label>
        <textarea
          id="instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Describe how to make this recipe..."
          rows={5}
        />
      </div>

      <div className="form-group">
        <label htmlFor="cookTime">Cook Time</label>
        <input
          id="cookTime"
          type="text"
          value={cookTime}
          onChange={(e) => setCookTime(e.target.value)}
          placeholder="e.g., 30 mins"
        />
      </div>

      <div className="form-buttons">
        <button type="submit" className="btn-primary">
          {isEditing ? 'Save Changes' : 'Add Recipe'}
        </button>
        {onCancel && (
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default RecipeForm;
