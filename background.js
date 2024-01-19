browser.action.onClicked.addListener((() =>
  browser.tabs.create({
    url: '/pages/search/search.html'
  })))
