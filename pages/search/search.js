import * as Store from './modules/store.js'
import * as bridge from './modules/bridge.js'
import * as dom from './modules/dom.js'
import * as inputHandlers from './modules/inputHandlers.js'

const store = Store.init({
  tabs: browser.tabs,
  windows: browser.windows,
  onStateUpdate: dom.updateSearchResults,
  closeCurrentTab: () => {
    browser.runtime.sendMessage({action: 'closeSender'})
  },
})

void bridge.registerTab()
void dom.enableFaviconFallback()

void inputHandlers.attachInputHandlers(store)
