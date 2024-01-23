export const registerTab = () => {
  browser.runtime.sendMessage({action: 'registerSender'})
}
