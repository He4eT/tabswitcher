export const actionboxHandlers = (commandQuery, store, flush) => {
  const command = commandQuery.slice(0, 1)
  const label = commandQuery.slice(1)

  const noop = (command) => () => {
    if (command) {
      console.log('Unsupported command:', command)
    }
  }

  ({
    '?': openHelp,
    'x': closeCurrentTab,
    'r': reloadCurrentTab,
    /* */
    'f': switchToTab,
    'd': closeTab,
    'c': duplicateTab,
  }[command] ?? noop(command))(store, label, flush)
}

/* */

function openHelp () {

}

function closeCurrentTab () {
  window.close()
}

function reloadCurrentTab () {
  location.reload()
}

/* */

const getTabByLabel = (store, label) => {
  const tabs = store.getCurrentState().tabs
  return tabs.find(tab => tab.label === label)
}

function switchToTab (store, label) {
  const tab = getTabByLabel(store, label)
  if (tab) {
    store.actions.goToTab(tab.id)
    flush()
    closeCurrentTab()
  }
}

function closeTab (store, label, flush) {
  const tab = getTabByLabel(store, label)
  if (tab) {
    store.actions.closeTab(tab.id)
    flush()
  }
}

function duplicateTab (store, label, flush) {
  const tab = getTabByLabel(store, label)
  if (tab) {
    browser.tabs.create({
      active: false,
      url: tab.url,
    }).then(store.actions.updateState)
    flush()
  }
}
