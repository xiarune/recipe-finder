import { useState, useEffect } from 'react';
import './App.css';
import {
  getRecipes,
  addRecipe,
  updateRecipe,
  deleteRecipe,
  toggleFavorite,
} from './utils/storage';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';
import MealPlanner from './components/MealPlanner';

function App() {
  // State
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [currentView, setCurrentView] = useState('landing'); // 'landing', 'recipes', 'favorites', 'planner'

  // Load recipes from localStorage on initial render
  useEffect(() => {
    const storedRecipes = getRecipes();
    setRecipes(storedRecipes);
  }, []);

  // Get favorite recipes
  const favoriteRecipes = recipes.filter((r) => r.favorite);

  // Filter recipes based on search term
  const getFilteredRecipes = (recipeList) => {
    if (!searchTerm) return recipeList;
    const query = searchTerm.toLowerCase();
    return recipeList.filter((recipe) => {
      const titleMatch = recipe.title.toLowerCase().includes(query);
      const ingredientMatch = recipe.ingredients.some((ing) =>
        ing.toLowerCase().includes(query)
      );
      return titleMatch || ingredientMatch;
    });
  };

  // Get recipes to display based on current view
  const displayedRecipes =
    currentView === 'favorites'
      ? getFilteredRecipes(favoriteRecipes)
      : getFilteredRecipes(recipes);

  // Handler: Add a new recipe
  const handleAddRecipe = (recipeData) => {
    const newRecipe = addRecipe(recipeData);
    setRecipes([...recipes, newRecipe]);
    setShowForm(false);
    setCurrentView('recipes');
  };

  // Handler: Update an existing recipe
  const handleUpdateRecipe = (recipeData) => {
    const updated = updateRecipe(editingRecipe.id, recipeData);
    if (updated) {
      setRecipes(recipes.map((r) => (r.id === updated.id ? updated : r)));
    }
    setEditingRecipe(null);
  };

  // Handler: Delete a recipe
  const handleDeleteRecipe = (id) => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      deleteRecipe(id);
      setRecipes(recipes.filter((r) => r.id !== id));
    }
  };

  // Handler: Toggle favorite status
  const handleToggleFavorite = (id) => {
    const updated = toggleFavorite(id);
    if (updated) {
      setRecipes(recipes.map((r) => (r.id === updated.id ? updated : r)));
    }
  };

  // Handler: Open edit form
  const handleEditRecipe = (recipe) => {
    setEditingRecipe(recipe);
    setShowForm(false);
  };

  // Handler: Cancel form
  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRecipe(null);
  };

  // Handler: Go to landing page
  const goHome = () => {
    setShowForm(false);
    setEditingRecipe(null);
    setSearchTerm('');
    setCurrentView('landing');
  };

  // Handler: Navigate to search view
  const goToSearch = () => {
    setSearchTerm('');
    setCurrentView('recipes');
  };

  // Handler: Navigate to favorites
  const goToFavorites = () => {
    setSearchTerm('');
    setCurrentView('favorites');
  };

  // Handler: Navigate to meal planner
  const goToPlanner = () => {
    setCurrentView('planner');
  };

  // Determine if form is visible
  const isFormVisible = showForm || editingRecipe;

  return (
    <div className="app">
      <header className="header">
        <button className="logo" onClick={goHome}>
          Recipe Finder
        </button>
        {currentView !== 'landing' && currentView !== 'planner' && !isFormVisible && (
          <div className="header-actions">
            <button className="add-btn" onClick={() => setShowForm(true)}>
              + Add Recipe
            </button>
          </div>
        )}
      </header>

      <main className="main">
        {isFormVisible ? (
          // Add or Edit form
          <RecipeForm
            onSubmit={editingRecipe ? handleUpdateRecipe : handleAddRecipe}
            onCancel={handleCancelForm}
            initialData={editingRecipe}
          />
        ) : currentView === 'planner' ? (
          // Meal Planner view
          <MealPlanner
            favoriteRecipes={favoriteRecipes}
            onClose={() => setCurrentView('landing')}
          />
        ) : currentView === 'landing' ? (
          // Landing page
          <>
            <div className="hero">
              <h1 className="title">Find your next favorite meal</h1>
              <p className="description">
                Discover recipes based on ingredients you already have.
                Simple, delicious, stress-free cooking starts here.
              </p>
              <div className="hero-buttons">
                <button
                  className="cta-button"
                  onClick={() => {
                    setShowForm(true);
                    setCurrentView('recipes');
                  }}
                >
                  {recipes.length === 0 ? 'Add Your First Recipe' : 'Add Recipe'}
                </button>
                {recipes.length > 0 && (
                  <button
                    className="cta-button secondary"
                    onClick={() => setCurrentView('recipes')}
                  >
                    View Recipes ({recipes.length})
                  </button>
                )}
              </div>
            </div>

            <div className="features">
              <button className="feature" onClick={goToSearch}>
                <span className="feature-icon">🥗</span>
                <span className="feature-text">Search by ingredient</span>
              </button>
              <button className="feature" onClick={goToFavorites}>
                <span className="feature-icon">⭐</span>
                <span className="feature-text">
                  Save favorites {favoriteRecipes.length > 0 && `(${favoriteRecipes.length})`}
                </span>
              </button>
              <button className="feature" onClick={goToPlanner}>
                <span className="feature-icon">📅</span>
                <span className="feature-text">Plan your week</span>
              </button>
            </div>
          </>
        ) : (
          // Recipe list view (recipes or favorites)
          <div className="recipes-container">
            <div className="view-header">
              <button
                className={`view-tab ${currentView === 'recipes' ? 'active' : ''}`}
                onClick={() => setCurrentView('recipes')}
              >
                All Recipes
              </button>
              <button
                className={`view-tab ${currentView === 'favorites' ? 'active' : ''}`}
                onClick={() => setCurrentView('favorites')}
              >
                Favorites ({favoriteRecipes.length})
              </button>
            </div>

            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

            <h2>
              {searchTerm
                ? `Found ${displayedRecipes.length} recipe${displayedRecipes.length !== 1 ? 's' : ''}`
                : currentView === 'favorites'
                  ? `Your Favorites (${favoriteRecipes.length})`
                  : `Your Recipes (${recipes.length})`}
            </h2>

            {displayedRecipes.length === 0 && currentView === 'favorites' && !searchTerm ? (
              <div className="no-recipes">
                <p>No favorite recipes yet.</p>
                <p>Click the star on any recipe to add it to your favorites!</p>
              </div>
            ) : (
              <RecipeList
                recipes={displayedRecipes}
                onEdit={handleEditRecipe}
                onDelete={handleDeleteRecipe}
                onToggleFavorite={handleToggleFavorite}
              />
            )}
          </div>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Recipe Finder</p>
      </footer>
    </div>
  );
}

export default App;
