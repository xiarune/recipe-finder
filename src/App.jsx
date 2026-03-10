import './App.css'

function App() {
  return (
    <div className="app">
      <header className="header">
        <span className="logo">Recipe Finder</span>
      </header>

      <main className="main">
        <div className="hero">
          <h1 className="title">Find your next favorite meal</h1>
          <p className="description">
            Discover recipes based on ingredients you already have.
            Simple, delicious, stress-free cooking starts here.
          </p>
          <button className="cta-button">Start Cooking</button>
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
      </main>

      <footer className="footer">
        <p>&copy; 2026 Recipe Finder</p>
      </footer>
    </div>
  )
}

export default App
