import { useEffect, useState } from 'react'

// Returns value, but only after it has stopped changing for `ms` milliseconds.
// Search fires once per pause instead of once per keystroke.
export default function useDebounce(value, ms = 400) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms)
    return () => clearTimeout(id) // typing again cancels the pending update
  }, [value, ms])

  return debounced
}
