const focusButtonsWithArrows = (e, abortCallback) => {
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

    const shouldAbort = [
      e.key === 'ArrowUp' && currentIndex === 0,
      e.key === 'ArrowDown' && currentIndex === buttons.length - 1,
    ].some(Boolean)

    if (shouldAbort) {
      abortCallback()
    } else {
      buttons[newIndex].focus()
    }
  }
}

export const attachInputHandlers = (store) => {
  const searchBox = document.getElementById('searchbox')
  const actionbox = document.getElementById('actionbox')

  document.addEventListener('keydown', (e) => {
    focusButtonsWithArrows(e, () => {
      searchBox.focus()
    })

    if (e.key === 'Escape') {
      searchBox.focus()
    }
  })


  searchBox.addEventListener('input', (e) => {
    store.actions.updateQuery(e.target.value)
  })
}
