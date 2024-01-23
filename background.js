/* State */

let registeredTabs = {}

const addRegisteredTab = (tab) =>
  registeredTabs[tab.id] = tab

const removeRegisteredTab = (tabId) =>
  delete registeredTabs[tabId]

/* Utils */

const wait = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout))

/* Handlers */

browser.action.onClicked.addListener((() =>
  browser.tabs.create({
    url: '/pages/search/search.html'
  })))

browser.runtime.onMessage.addListener((message, sender) => {
  switch (message.action) {
    case 'closeSender':
      browser.tabs.remove(sender.tab.id)
      break
    case 'registerSender':
      addRegisteredTab(sender.tab)
      break
  }
})

browser.tabs.onRemoved.addListener((tabId) => {
  if (Object.keys(registeredTabs).includes(String(tabId))) {
    const closedTab = registeredTabs[tabId]

    wait(300) // Tabs and sessions cannot be synchronised in any other way
      .then(browser.sessions.getRecentlyClosed)
      .then((sessions) => sessions ?? [])
      .then((sessions) => sessions
        .filter((session) => session.tab))
      .then((sessions) => sessions
        .filter(({tab}) => tab.url === closedTab.url))
      .then((sessions) => sessions.forEach(({tab}) => {
        console.log(tab)
        browser.sessions.forgetClosedTab(tab.windowId, tab.sessionId)
          .then(() => removeRegisteredTab(tabId))
      }))
  }
})
