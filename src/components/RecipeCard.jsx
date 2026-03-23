function RecipeCard({ recipe, onEdit, onDelete, onToggleFavorite }) {
  return (
    <div className="recipe-card">
      <div className="recipe-card-header">
        <h3 className="recipe-card-title">{recipe.title}</h3>
        <button
          className={`favorite-btn ${recipe.favorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(recipe.id)}
          aria-label={recipe.favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {recipe.favorite ? '★' : '☆'}
        </button>
      </div>

      {recipe.cookTime && (
        <div className="recipe-card-cooktime">
          <span className="cooktime-icon">⏱</span>
          <span>{recipe.cookTime}</span>
        </div>
      )}

      <div className="recipe-card-ingredients">
        <strong>Ingredients:</strong>
        <p>
          {recipe.ingredients.length > 0
            ? recipe.ingredients.join(', ')
            : 'No ingredients listed'}
        </p>
      </div>

      <div className="recipe-card-instructions">
        <strong>Instructions:</strong>
        <p>{recipe.instructions || 'No instructions provided'}</p>
      </div>

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
