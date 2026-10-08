// The message is for the user. The real error already went to console.error inside useFetch.
export default function ErrorBox({ title, message, onRetry }) {
  return (
    <div className="status error" role="alert">
      <strong>{title}</strong>
      <p>{message}</p>
      {onRetry && <button onClick={onRetry}>Retry</button>}
    </div>
  )
}
