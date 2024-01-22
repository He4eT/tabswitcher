browser.action.onClicked.addListener((() =>
  browser.tabs.create({
    url: '/pages/search/search.html'
  })))

browser.runtime.onMessage.addListener((message, sender) => {
  switch (message.action) {
    case 'closeSender':
      Promise.resolve()
        .then(() => browser.tabs.remove(sender.tab.id))
        .then(() => browser.sessions.getRecentlyClosed({maxResults: 1}))
        .then(([sessionInfo]) => browser.sessions.forgetClosedTab(
          sessionInfo.tab.windowId,
          sessionInfo.tab.sessionId))
      break
  }
})
