function RecipeCard({ recipe, onDelete, onEdit, onToggleFavorite }) {
  return (
    <div className="recipe-card">
      <div className="recipe-card-header">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <button
          className={`favorite-btn ${recipe.isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(recipe.id)}
          aria-label={recipe.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {recipe.isFavorite ? '★' : '☆'}
        </button>
      </div>

      <div className="recipe-card-ingredients">
        <strong>Ingredients:</strong>
        <p>{recipe.ingredients.join(', ') || 'No ingredients listed'}</p>
      </div>

      {recipe.instructions && (
        <div className="recipe-card-instructions">
          <strong>Instructions:</strong>
          <p>{recipe.instructions}</p>
        </div>
      )}

      <div className="recipe-card-actions">
        <button className="btn-edit" onClick={() => onEdit(recipe)}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(recipe.id)}>
          Delete
        </button>
      </div>
    </div>
  );
}

export default RecipeCard;
