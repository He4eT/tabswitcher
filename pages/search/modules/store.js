import * as labels from './labels.js'
const fuzzysort = window.fuzzysort

export const init = ({
  tabs: browserTabs,
  onStateUpdate,
}) => {
  /* Initial state */
  const state = {
    tabs: [],
    results: [],
    query: '',
  }

  /* */

  const addLabel = (tabs) => (tab) => ({
    label: labels.id2label(tab.id, tabs),
    ...tab,
  })

  const pickFields = (tab) => [
    'favIconUrl',
    'id',
    'label',
    'title',
    'url',
  ].reduce((acc, x) => (acc[x] = tab[x], acc), {})

  const addDisplayName = (tab) => ({
    displayName: `
      <span>${tab.label}</span>
      <span>${tab.title} / ${tab.url}</span>`,
    ...tab,
  })

  const shapeTabs = (tabs) => tabs
    .map(addLabel(tabs))
    .map(pickFields)
    .map(addDisplayName)

  const fetchTabs = () =>
    browserTabs.query({ currentWindow: true, active: false })
      .then(shapeTabs)
      .then((tabs) => tabs.reverse())
      .then((tabs) => void (state.tabs = tabs))

  /* */

  const updateResults = () => {
    state.results = fuzzysort.go(state.query, state.tabs, {
      keys: ['label', 'title', 'url'],
      all: true,
    }).map(({obj}) => obj)
  }
  /* */

  const updateState = () =>
    Promise.resolve()
      .then(fetchTabs)
      .then(updateResults)
      .then(() => onStateUpdate(state))

  updateState()

  /* */

  return {
    getCurrentState() {
      return state
    },
    actions: {
      goToTab(id) {
        browserTabs.update(id, { active: true })
          .then(updateState)
      },
      closeTab(id) {
        browserTabs.remove(id)
          .then(updateState)
      },
      updateQuery(query) {
        state.query = query
        updateState()
      },
    },
  }
}
