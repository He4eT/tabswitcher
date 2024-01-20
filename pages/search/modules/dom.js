const tabView = (tab) =>
  `<button class='tab'>${tab.displayName}</button>`

export const updateSearchResults = (state) => {
  const container = document.getElementById('searchResults')
  container.innerHTML = state.results.map(tabView).join('')
}
