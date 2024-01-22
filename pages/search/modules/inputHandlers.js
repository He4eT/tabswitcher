import { actionboxHandlers } from './actionboxHandlers.js'

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
  searchBox.value = ''

  const actionbox = document.getElementById('actionbox')
  actionbox.value = ''

  /* Arrow keys */
  document.addEventListener('keydown', (e) => {
    focusButtonsWithArrows(e, () => {
      searchBox.focus()
    })

    if (e.key === 'Escape') {
      const resetSearch = () => {
        searchBox.value = ''
        store.actions.updateQuery('')
      }

      document.activeElement === searchBox
        ? searchBox.value === ''
          ? store.actions.closeCurrentTab()
          : resetSearch()
        : searchBox.focus()
    }
  })

  /* Buttons */
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('tab')) {
      const tabId = parseInt(event.target.dataset.id)
      store.actions.goToTab(tabId)
    }
  })

  /* Actionbox */
  actionbox.addEventListener('input', (e) => {
    const commandQuery = e.target.value
    const flush = () => (actionbox.value = '')

    actionboxHandlers(commandQuery, store, flush)
  })

  /* Searchbox*/

  searchBox.addEventListener('input', (e) => {
    store.actions.updateQuery(e.target.value)
  })

  searchBox.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      let visibleTabs = store.getCurrentState().results
      if (visibleTabs.length > 0) {
        const tabId = visibleTabs[0].obj.id
        store.actions.goToTab(tabId)
      }
    }
  })
}
