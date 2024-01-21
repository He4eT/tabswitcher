import * as Store from './modules/store.js'
import * as dom from './modules/dom.js'
import * as inputHandlers from './modules/inputHandlers.js'

const store = Store.init({
  tabs: browser.tabs,
  onStateUpdate: dom.updateSearchResults,
  closeCurrentTab: () => window.close(),
})

void inputHandlers.attachInputHandlers(store)
