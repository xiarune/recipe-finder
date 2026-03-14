import { useState } from 'react';
import './App.css';
import useLocalStorage from './hooks/useLocalStorage';
import RecipeForm from './components/RecipeForm';
import RecipeList from './components/RecipeList';
import SearchBar from './components/SearchBar';

function App() {
  const [recipes, setRecipes] = useLocalStorage('recipes', []);
  const [showForm, setShowForm] = useState(false);
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredRecipes = recipes.filter((recipe) => {
    const query = searchQuery.toLowerCase();
    const titleMatch = recipe.title.toLowerCase().includes(query);
    const ingredientMatch = recipe.ingredients.some((ing) =>
      ing.toLowerCase().includes(query)
    );
    return titleMatch || ingredientMatch;
  });

  const addRecipe = (recipe) => {
    setRecipes([...recipes, recipe]);
    setShowForm(false);
  };

  const updateRecipe = (updatedRecipe) => {
    setRecipes(
      recipes.map((r) => (r.id === updatedRecipe.id ? updatedRecipe : r))
    );
    setEditingRecipe(null);
  };

  const deleteRecipe = (id) => {
    if (confirm('Are you sure you want to delete this recipe?')) {
      setRecipes(recipes.filter((r) => r.id !== id));
    }
  };

  const toggleFavorite = (id) => {
    setRecipes(
      recipes.map((r) =>
        r.id === id ? { ...r, isFavorite: !r.isFavorite } : r
      )
    );
  };

  const handleEdit = (recipe) => {
    setEditingRecipe(recipe);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingRecipe(null);
  };

  const isFormOpen = showForm || editingRecipe;

  return (
    <div className="app">
      <header className="header">
        <span className="logo">Recipe Finder</span>
        {recipes.length > 0 && !isFormOpen && (
          <button className="add-btn" onClick={() => setShowForm(true)}>
            + Add Recipe
          </button>
        )}
      </header>

      <main className="main">
        {isFormOpen ? (
          <RecipeForm
            onSave={editingRecipe ? updateRecipe : addRecipe}
            onCancel={handleCancelForm}
            initialData={editingRecipe}
          />
        ) : recipes.length === 0 ? (
          <>
            <div className="hero">
              <h1 className="title">Find your next favorite meal</h1>
              <p className="description">
                Discover recipes based on ingredients you already have.
                Simple, delicious, stress-free cooking starts here.
              </p>
              <button className="cta-button" onClick={() => setShowForm(true)}>
                Add Your First Recipe
              </button>
            </div>

            <div className="features">
              <div className="feature">
                <span className="feature-icon">🥗</span>
                <span className="feature-text">Search by ingredient</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⭐</span>
                <span className="feature-text">Save favorites</span>
              </div>
              <div className="feature">
                <span className="feature-icon">📅</span>
                <span className="feature-text">Plan your week</span>
              </div>
            </div>
          </>
        ) : (
          <div className="recipes-container">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <h2>
              {searchQuery
                ? `Found ${filteredRecipes.length} recipe${filteredRecipes.length !== 1 ? 's' : ''}`
                : `Your Recipes (${recipes.length})`}
            </h2>
            <RecipeList
              recipes={filteredRecipes}
              onDelete={deleteRecipe}
              onEdit={handleEdit}
              onToggleFavorite={toggleFavorite}
            />
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
