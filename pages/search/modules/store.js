import * as labels from './labels.js'

export const init = ({
  tabs: browserTabs,
  onStateUpdate,
}) => {
  /* Initial state */
  const state = {
    tabs: [],
  }

  /* */

  const shapeTabs = (tabs) => tabs
    .map((tab) => ({
      label: labels.id2label(tab.id, tabs),
      ...tab,
    }))
    .map((tab) => [
      'favIconUrl',
      'id',
      'label',
      'title',
      'url',
    ].reduce((acc, x) => (acc[x] = tab[x], acc), {}))

  const fetchTabs = () =>
    browserTabs.query({ currentWindow: true, active: false })
      .then(shapeTabs)
      .then((tabs) => tabs.reverse())
      .then((tabs) => void (state.tabs = tabs))

  /* */

  const updateState = () =>
    fetchTabs()
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
    },
  }
}
