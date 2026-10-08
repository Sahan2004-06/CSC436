import useFetch from '../hooks/useFetch'
import { recipeUrl } from '../api'
import ErrorBox from './ErrorBox'

// Bonus: a second, independent useFetch call. Its own data, loading and error.
export default function RecipeDetail({ id }) {
  const { data: recipe, loading, error, refetch } = useFetch(recipeUrl(id), { retries: 2 })

  if (id == null) return <aside className="detail status">Click a recipe to see details.</aside>
  if (loading && !recipe) return <aside className="detail status">Loading recipe…</aside>
  if (error) {
    return (
      <aside className="detail">
        <ErrorBox title="Could not load this recipe" message={error} onRetry={refetch} />
      </aside>
    )
  }

  return (
    <aside className={'detail' + (loading ? ' updating' : '')}>
      {loading && <span className="tag">Updating…</span>}
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
