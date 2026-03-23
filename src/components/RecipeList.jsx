import RecipeCard from './RecipeCard';

function RecipeList({ recipes, onEdit, onDelete, onToggleFavorite }) {
  // Show message when no recipes exist
  if (recipes.length === 0) {
    return (
      <div className="no-recipes">
        <p>No recipes found.</p>
      </div>
    );
  }

  // Render list of recipe cards
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default RecipeList;
