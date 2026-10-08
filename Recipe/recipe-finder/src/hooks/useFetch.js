import { useEffect, useState } from 'react'

// Turn a real error into a message a human can act on.
// The real error object still goes to console.error.
function messageFor(err) {
  // fetch() itself rejects with a TypeError when the server can't be reached
  if (err.name === 'TypeError') return 'Could not reach the server. Check your internet connection and try again.'
  if (err.status === 404) return 'We could not find that. It may have been moved or removed.'
  if (err.status >= 500) return 'The recipe server is having trouble right now. Try again in a moment.'
  return 'Something went wrong while loading. Try again.'
}

// Retry network failures and 5xx only. A 404 will still be missing on attempt three.
function shouldRetry(err) {
  return err.name === 'TypeError' || err.status >= 500
}

export default function useFetch(url, { retries = 0 } = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [tick, setTick] = useState(0)

  useEffect(() => {
    if (!url) return // nothing to fetch yet (e.g. no recipe selected)

    let alive = true
    let timer = null

    async function load(attempt) {
      try {
        setLoading(true)
        setError(null)
        const res = await fetch(url)
        if (!res.ok) {
          const err = new Error('HTTP ' + res.status)
          err.status = res.status
          throw err
        }
        const json = await res.json()
        if (alive) {
          setData(json) // old data stays on screen until this moment
          setLoading(false)
        }
      } catch (err) {
        if (!alive) return
        console.error(`useFetch ${url} (attempt ${attempt})`, err)
        if (attempt <= retries && shouldRetry(err)) {
          // backoff: wait 500ms, then 1000ms, then 2000ms...
          timer = setTimeout(() => load(attempt + 1), 500 * 2 ** (attempt - 1))
          return
        }
        setError(messageFor(err))
        setLoading(false)
      }
    }

    load(1)

    return () => {
      alive = false
      clearTimeout(timer)
    }
  }, [url, tick, retries])

  const refetch = () => setTick((t) => t + 1)
  return { data, loading, error, refetch }
}
