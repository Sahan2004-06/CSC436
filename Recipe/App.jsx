import { useEffect, useState } from 'react'
import './App.css'

// Add ?delay=2000 style param while building to see the loading state.
const BASE = 'https://dummyjson.com/recipes'
const DELAY = 'delay=1000'

export default function App() {
  const [query, setQuery] = useState('')
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0) // bumping this refetches
  const [selectedId, setSelectedId] = useState(null)

  // Gold: list/search effect, depends on [query]
  useEffect(() => {
    let alive = true

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const q = query.trim()
        const url = q
          ? `${BASE}/search?q=${encodeURIComponent(q)}&${DELAY}`
          : `${BASE}?${DELAY}`
        const res = await fetch(url)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        if (alive) setRecipes(data.recipes)
      } catch (err) {
        console.error(err)
        if (alive) setError('Could not load recipes. Try again.')
      } finally {
        if (alive) setLoading(false)
      }
    }

    load()
    return () => { alive = false }
  }, [query, reloadKey])

  // Bonus: second effect keeps the tab title in sync with the result count
  useEffect(() => {
    document.title = loading ? 'Recipe Finder' : `${recipes.length} recipes | Recipe Finder`
  }, [recipes, loading])

  return (
    <main className="app">
      <header>
        <h1>Recipe Finder</h1>
        <div className="controls">
          <input
            type="search"
            placeholder="Search recipes (e.g. pasta)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={() => setReloadKey((k) => k + 1)}>Refetch</button>
        </div>
      </header>

      <div className="layout">
        <section className="list">
          {loading && <p className="status">Loading recipes…</p>}

          {!loading && error && (
            <div className="status error">
              <p>{error}</p>
              <button onClick={() => setReloadKey((k) => k + 1)}>Retry</button>
            </div>
          )}

          {!loading && !error && recipes.length === 0 && (
            <p className="status">
              No recipes match "{query}". Try something like "pasta", "chicken" or "salad".
            </p>
          )}

          {!loading && !error && recipes.length > 0 && (
            <ul>
              {recipes.map((r) => (
                <li
                  key={r.id}
                  className={r.id === selectedId ? 'active' : ''}
                  onClick={() => setSelectedId(r.id)}
                >
                  <strong>{r.name}</strong>
                  <span>{r.cuisine}</span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <RecipeDetail id={selectedId} />
      </div>
    </main>
  )
}

// Bonus: detail panel with its own three states
function RecipeDetail({ id }) {
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (id == null) return
    let alive = true

    async function load() {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(`${BASE}/${id}?${DELAY}`)
        if (!res.ok) throw new Error('HTTP ' + res.status)
        const data = await res.json()
        if (alive) setRecipe(data)
      } catch (err) {
        console.error(err)
        if (alive) setError('Could not load this recipe. Try again.')
      } finally {
        if (alive) setLoading(false)
      }
    }

    load()
    return () => { alive = false }
  }, [id])

  if (id == null) return <aside className="detail status">Click a recipe to see details.</aside>
  if (loading) return <aside className="detail status">Loading recipe…</aside>
  if (error) return <aside className="detail status error">{error}</aside>
  if (!recipe) return null

  return (
    <aside className="detail">
      <img src={recipe.image} alt={recipe.name} />
      <h2>{recipe.name}</h2>
      <p className="meta">
        {recipe.cuisine} · {recipe.difficulty} · {recipe.prepTimeMinutes + recipe.cookTimeMinutes} min · ⭐ {recipe.rating}
      </p>
      <h3>Ingredients</h3>
      <ul>
        {recipe.ingredients.map((ing, i) => <li key={i}>{ing}</li>)}
      </ul>
      <h3>Instructions</h3>
      <ol>
        {recipe.instructions.map((step, i) => <li key={i}>{step}</li>)}
      </ol>
    </aside>
  )
}
