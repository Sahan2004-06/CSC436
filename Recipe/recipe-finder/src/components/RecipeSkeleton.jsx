// Grey placeholder rows shaped like a real recipe row, so the layout doesn't jump when data lands.
export default function RecipeSkeleton({ rows = 6 }) {
  return (
    <ul aria-label="Loading recipes">
      {Array.from({ length: rows }).map((_, i) => (
        <li key={i} className="row skeleton-row">
          <div className="sk sk-name" />
          <div className="sk sk-cuisine" />
        </li>
      ))}
    </ul>
  )
}
