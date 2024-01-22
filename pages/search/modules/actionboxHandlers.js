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
    /* */
    'c': cloneTab,
    'd': closeTab,
    'e': moveTabToPopup,
    'f': switchToTab,
    'p': pinOrUnpinTab,
    's': discardTab,
    /* */
    'C': cloneTopTab,
    'D': closeTopTab,
    'F': switchToTopTab,
    'S': discardVisibleTabs,
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

/* */

const getTabByLabel = (store, label) => {
  const tabs = store.getCurrentState().tabs
  return tabs.find(tab => tab.label === label)
}

const getVisibleTabs = (store) => {
  const tabs = store.getCurrentState().results.map(({obj}) => obj)
  return tabs ?? []
}

const getTopTab = (store) => {
  const tabs = getVisibleTabs(store)
  return tabs.length > 0
    ? tabs[0]
    : undefined
}

/* */

function cloneTab (store, label, flush) {
  const tab = getTabByLabel(store, label)
  if (tab) {
    flush()
    store.actions.createBackgroundTab(tab.url)
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

function switchToTab (store, label, flush) {
  const tab = getTabByLabel(store, label)
  if (tab) {
    flush()
    store.actions.goToTab(tab.id)
    store.actions.closeCurrentTab()
  }
}

/* */

function cloneTopTab (store, _, flush) {
  const tab = getTopTab(store)
  cloneTab(store, tab.label, flush)
}

function closeTopTab (store, _, flush) {
  const tab = getTopTab(store)
  closeTab(store, tab.label, flush)
}

function switchToTopTab (store, _, flush) {
  const tab = getTopTab(store)
  switchToTab(store, tab.label, flush)
}

function discardVisibleTabs (store, _, flush) {
  const tabs = getVisibleTabs(store)
  tabs.forEach((tab) => discardTab(store, tab.label, flush))
}
