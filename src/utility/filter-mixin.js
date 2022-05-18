export function parseLocalStorage() {
  return JSON.parse(localStorage.getItem('filter'))
}