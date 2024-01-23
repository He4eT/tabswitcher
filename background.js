browser.action.onClicked.addListener((() =>
  browser.tabs.create({
    url: '/pages/search/search.html'
  })))

/* */

let registeredTabs = []

const addRegisteredTab = (tabId) =>
  registeredTabs = [tabId, ...registeredTabs]

const removeRegisteredTab = (tabId) =>
  registeredTabs = registeredTabs.filter((x) => x !== tabId)

/* */

browser.tabs.onRemoved.addListener((tabId) => {
  console.log(tabId, registeredTabs)
  if (!registeredTabs.includes(tabId)) {
    return
  }

  removeRegisteredTab(tabId)

  const timeout = () => new Promise((resolve) =>
    setTimeout(resolve, 500))

  timeout()
    .then(() => browser.sessions.getRecentlyClosed({maxResults: 1}))
    .then((x) => (console.log(x), x))
    .then(([sessionInfo]) => browser.sessions.forgetClosedTab(
      sessionInfo.tab.windowId,
      sessionInfo.tab.sessionId))
})

browser.runtime.onMessage.addListener((message, sender) => {
  switch (message.action) {
    case 'closeSender':
      browser.tabs.remove(sender.tab.id)
      break
    case 'registerSender':
      addRegisteredTab(sender.tab.id)
      break
  }
})
