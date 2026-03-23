/**
 * localStorage helper for Recipe Finder app
 * Handles all recipe data persistence
 */

const STORAGE_KEY = 'recipes';

/**
 * Get all recipes from localStorage
 * @returns {Array} Array of recipe objects
 */
export function getRecipes() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading recipes:', error);
    return [];
  }
}

/**
 * Save all recipes to localStorage
 * @param {Array} recipes - Array of recipe objects to save
 */
export function saveRecipes(recipes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  } catch (error) {
    console.error('Error saving recipes:', error);
  }
}

/**
 * Add a new recipe
 * @param {Object} recipe - Recipe object (without id and createdAt)
 * @returns {Object} The newly created recipe with id and createdAt
 */
export function addRecipe(recipe) {
  const recipes = getRecipes();

  const newRecipe = {
    id: `recipe_${Date.now()}`,
    title: recipe.title || '',
    ingredients: recipe.ingredients || [],
    instructions: recipe.instructions || '',
    cookTime: recipe.cookTime || '',
    favorite: recipe.favorite || false,
    createdAt: Date.now(),
  };

  recipes.push(newRecipe);
  saveRecipes(recipes);

  return newRecipe;
}

/**
 * Update an existing recipe
 * @param {string} id - Recipe ID to update
 * @param {Object} updates - Object with fields to update
 * @returns {Object|null} Updated recipe or null if not found
 */
export function updateRecipe(id, updates) {
  const recipes = getRecipes();
  const index = recipes.findIndex((r) => r.id === id);

  if (index === -1) {
    console.error('Recipe not found:', id);
    return null;
  }

  // Merge updates with existing recipe
  const updatedRecipe = {
    ...recipes[index],
    ...updates,
    id: recipes[index].id, // Preserve original id
    createdAt: recipes[index].createdAt, // Preserve original createdAt
  };

  recipes[index] = updatedRecipe;
  saveRecipes(recipes);

  return updatedRecipe;
}

/**
 * Delete a recipe by ID
 * @param {string} id - Recipe ID to delete
 * @returns {boolean} True if deleted, false if not found
 */
export function deleteRecipe(id) {
  const recipes = getRecipes();
  const filteredRecipes = recipes.filter((r) => r.id !== id);

  if (filteredRecipes.length === recipes.length) {
    console.error('Recipe not found:', id);
    return false;
  }

  saveRecipes(filteredRecipes);
  return true;
}

/**
 * Toggle favorite status for a recipe
 * @param {string} id - Recipe ID to toggle
 * @returns {Object|null} Updated recipe or null if not found
 */
export function toggleFavorite(id) {
  const recipes = getRecipes();
  const recipe = recipes.find((r) => r.id === id);

  if (!recipe) {
    console.error('Recipe not found:', id);
    return null;
  }

  return updateRecipe(id, { favorite: !recipe.favorite });
}
