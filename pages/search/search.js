import * as Store from './modules/store.js'

console.log('1234')

const store = Store.init({
  tabs: browser.tabs,
  onStateUpdate: console.log,
})

console.log(store.getCurrentState())
