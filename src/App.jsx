import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1 className="title">Recipe Finder</h1>
        <p className="tagline">Discover delicious recipes for any occasion</p>
      </header>

      <main className="main">
        <section className="hero">
          <p className="description">
            Recipe Finder helps you discover new meals based on ingredients you already have.
            Search thousands of recipes, save your favorites, and plan your weekly meals with ease.
          </p>
          <button className="cta-button">Get Started</button>
        </section>

        <section className="features">
          <h2 className="features-title">Planned Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <span className="feature-icon">🔍</span>
              <h3>Search by Ingredient</h3>
              <p>Find recipes using ingredients you already have at home</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">❤️</span>
              <h3>Save Favorites</h3>
              <p>Bookmark recipes you love for quick access later</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">📋</span>
              <h3>Shopping Lists</h3>
              <p>Generate shopping lists from your selected recipes</p>
            </div>
            <div className="feature-card">
              <span className="feature-icon">🍽️</span>
              <h3>Meal Planning</h3>
              <p>Plan your weekly meals and stay organized</p>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Recipe Finder &copy; 2026</p>
      </footer>
    </div>
  )
}

export default App
