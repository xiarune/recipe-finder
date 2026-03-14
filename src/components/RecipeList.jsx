import RecipeCard from './RecipeCard';

function RecipeList({ recipes, onDelete, onEdit, onToggleFavorite }) {
  if (recipes.length === 0) {
    return (
      <div className="no-recipes">
        <p>No recipes found.</p>
      </div>
    );
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggleFavorite={onToggleFavorite}
        />
      ))}
    </div>
  );
}

export default RecipeList;
