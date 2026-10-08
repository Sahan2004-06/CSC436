import useFetch from '../hooks/useFetch'
import useDocumentTitle from '../hooks/useDocumentTitle'
import { searchUrl } from '../api'
import RecipeSkeleton from './RecipeSkeleton'
import ErrorBox from './ErrorBox'

export default function RecipeList({ query, selectedId, onSelect }) {
  const { data, loading, error, refetch } = useFetch(searchUrl(query), { retries: 2 })
  const recipes = data?.recipes ?? []

  useDocumentTitle(data ? `${recipes.length} recipes | Recipe Finder` : 'Recipe Finder')

  // First load: nothing to show yet, so show the skeleton
  if (loading && !data) return <RecipeSkeleton />

  if (error) {
    return <ErrorBox title="Could not load recipes" message={error} onRetry={refetch} />
  }

  // Refetch (new search): keep the old list on screen, dimmed, with an Updating tag
  const updating = loading && data

  if (recipes.length === 0) {
    return (
      <p className={'status' + (updating ? ' updating' : '')}>
        No recipes match "{query}". Try something like "pasta", "chicken" or "salad".
      </p>
    )
  }

  return (
    <div className={updating ? 'updating' : ''}>
      {updating && <span className="tag">Updating…</span>}
      <ul>
        {recipes.map((r) => (
          <li
            key={r.id}
            className={'row' + (r.id === selectedId ? ' active' : '')}
            onClick={() => onSelect(r.id)}
          >
            <strong>{r.name}</strong>
            <span>{r.cuisine}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
