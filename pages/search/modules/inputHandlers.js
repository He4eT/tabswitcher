export const attachInputHandlers = (store) => {
  const searchBox = document.getElementById('searchbox')
  const actionbox = document.getElementById('actionbox')

  searchBox.addEventListener('input', (e) => {
    store.actions.updateQuery(e.target.value)
  })
}
