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
    'q': closeCurrentTab,
    'r': reloadCurrentTab,
    /* */
    'f': switchToTab,
    // 'F': switchToTopTab,
    'd': closeTab,
    // 'D': closeTopTab,
    /* */
    'c': duplicateTab,
    // 'C': duplicateTopTab,
    's': discardTab,
    // 'S': discardTopActiveTab,
    'p': pinOrUnpinTab,
    'e': moveTabToPopup,
  }[command] ?? noop(command))(store, label, flush)
}

/* */

function openHelp () {
  const helpLink = 'https://github.com/He4eT/tabswitcher#Tabswitcher'
  location.href = helpLink
}

function closeCurrentTab (store) {
  store.actions.closeCurrentTab()
}

function reloadCurrentTab () {
  location.reload()
}

/* */

const getTabByLabel = (store, label) => {
  const tabs = store.getCurrentState().tabs
  return tabs.find(tab => tab.label === label)
}

function switchToTab (store, label, flush) {
  const tab = getTabByLabel(store, label)
  if (tab) {
    flush()
    store.actions.goToTab(tab.id)
    store.actions.closeCurrentTab()
  }
}

function closeTab (store, label, flush) {
  const tab = getTabByLabel(store, label)
  if (tab) {
    flush()
    store.actions.closeTab(tab.id)
  }
}

function discardTab (store, label, flush) {
  const tab = getTabByLabel(store, label)
  if (tab) {
    flush()
    store.actions.discardTab(tab.id)
  }
}

function duplicateTab (store, label, flush) {
  const tab = getTabByLabel(store, label)
  if (tab) {
    flush()
    store.actions.createBackgroundTab(tab.url)
  }
}

function moveTabToPopup (store, label, flush) {
  const tab = getTabByLabel(store, label)
  if (tab) {
    flush()
    store.actions.moveTabToPopup(tab.id)
    store.actions.closeCurrentTab()
  }
}

function pinOrUnpinTab (store, label, flush) {
  const tab = getTabByLabel(store, label)
  if (tab) {
    flush()
    store.actions.updateTab(tab.id, {pinned: !tab.pinned})
  }
}
