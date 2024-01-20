const focusButtonsWithArrows = (e) => {
  if (['ArrowUp', 'ArrowDown'].includes(e.key)) {
    e.preventDefault()

    const buttons = document.querySelectorAll('#searchResults > button')
    if (buttons.length === 0) { return }

    const currentIndex = [...buttons].indexOf(document.activeElement)
    const newIndex = currentIndex === -1
      ? ({
        'ArrowDown': 0,
        'ArrowUp': buttons.length - 1,
      }[e.key])
      : (({
        'ArrowDown': 1,
        'ArrowUp': -1,
      }[e.key]) + currentIndex + buttons.length) % buttons.length

    buttons[newIndex].focus()
  }
}

export const attachInputHandlers = (store) => {
  const searchBox = document.getElementById('searchbox')
  const actionbox = document.getElementById('actionbox')

  document.addEventListener('keydown', (e) => {
    focusButtonsWithArrows(e)
    if (e.key === 'Escape') {
      searchBox.focus()
    }
  })


  searchBox.addEventListener('input', (e) => {
    store.actions.updateQuery(e.target.value)
  })
}
