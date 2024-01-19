browser.action.onClicked.addListener((() =>
  browser.tabs.create({
    url: 'https://oddsquat.org'
  })))
