import * as labels from './labels.js'
const fuzzysort = window.fuzzysort

export const init = ({
  tabs: browserTabs,
  windows: browserWindows,
  onStateUpdate,
  closeCurrentTab,
}) => {
  /* Initial state */
  const state = {
    tabs: [],
    results: [],
    query: '',
  }

  /* */

  const addLabel = (tab, i, tabs) => ({
    label: labels.fromNumber(i, tabs.length),
    ...tab,
  })

  const pickFields = (tab) => [
    'discarded',
    'favIconUrl',
    'id',
    'label',
    'pinned',
    'title',
    'url',
  ].reduce((acc, x) => (acc[x] = tab[x], acc), {})

  const shapeTabs = (tabs) => tabs
    .map(addLabel)
    .map(pickFields)
    .reverse()

  const fetchTabs = () =>
    browserTabs.query({ currentWindow: true, active: false })
      .then(shapeTabs)
      .then((tabs) => void (state.tabs = tabs))

  /* */

  const updateResults = () => {
    state.results = fuzzysort.go(state.query, state.tabs, {
      keys: ['label', 'title', 'url'],
      all: true,
    })
  }
  /* */

  const updateState = () =>
    Promise.resolve()
      .then(fetchTabs)
      .then(updateResults)
      .then(() => onStateUpdate(state))

  updateState()

  /* */

  browserTabs.onAttached.addListener(updateState)
  browserTabs.onCreated.addListener(updateState)
  browserTabs.onDetached.addListener(updateState)
  browserTabs.onMoved.addListener(updateState)
  browserTabs.onRemoved.addListener(updateState)
  browserTabs.onReplaced.addListener(updateState)
  browserTabs.onUpdated.addListener(updateState)

  return {
    getCurrentState() {
      return state
    },
    actions: {
      updateState,
      goToTab(id) {
        browserTabs.update(id, { active: true })
          .then(updateState)
          .then(closeCurrentTab)
      },
      closeCurrentTab,
      closeTab(id) {
        browserTabs.remove(id)
          .then(updateState)
      },
      createBackgroundTab(url) {
        browserTabs.create({
          active: false,
          url,
        }).then(updateState)
      },
      discardTab(id) {
        browserTabs.discard(id)
          .then(updateState)
      },
      moveTabToPopup(id) {
        browserWindows.create({
          tabId: id,
          type: 'popup',
        }).then(updateState)
      },
      updateTab(id, options) {
        browserTabs.update(id, options)
          .then(updateState)
      },
      updateQuery(query) {
        state.query = query
        updateState()
      },
    },
  }
}
