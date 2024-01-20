import * as Store from './modules/store.js'

const store = Store.init({
  tabs: browser.tabs,
  onStateUpdate: console.log,
})

console.log(store.getCurrentState())
