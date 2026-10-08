import { useState } from 'react'
import useDebounce from './hooks/useDebounce'
import RecipeList from './components/RecipeList'
import RecipeDetail from './components/RecipeDetail'
import './App.css'

// No effects in any component file: all fetching lives in src/hooks/useFetch.js
export default function App() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const debouncedQuery = useDebounce(query, 400) // search fires once per pause

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
        </div>
      </header>

      <div className="layout">
        <section className="list">
          <RecipeList query={debouncedQuery} selectedId={selectedId} onSelect={setSelectedId} />
        </section>
        <RecipeDetail id={selectedId} />
      </div>
    </main>
  )
}
