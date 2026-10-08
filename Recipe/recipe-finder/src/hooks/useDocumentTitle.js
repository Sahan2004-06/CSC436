import { useEffect } from 'react'

// Keeps the browser tab title in sync. Lives in a hook so no component has a useEffect.
export default function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title
  }, [title])
}
