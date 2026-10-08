// All DummyJSON URLs live here.
// While building, set DELAY to '2000' to see the loading states. Set it back to '' before submitting.
// Failure tests: change HOST to 'https://dummyjson.comx' (network error)
//                or change '/recipes' to '/recipez' below (404).
const HOST = 'https://dummyjson.com'
const DELAY = ''

function withDelay(url) {
  if (!DELAY) return url
  return url + (url.includes('?') ? '&' : '?') + 'delay=' + DELAY
}

export function searchUrl(query) {
  const q = query.trim()
  return withDelay(q ? `${HOST}/recipes/search?q=${encodeURIComponent(q)}` : `${HOST}/recipes`)
}

export function recipeUrl(id) {
  return id == null ? null : withDelay(`${HOST}/recipes/${id}`)
}
