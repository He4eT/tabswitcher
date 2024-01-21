const fuzzysort = window.fuzzysort

/* https://png-pixel.com/ */
const defaultFavicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='

const tabView = (result) => {
  const tab = result.obj
  const [label, title, url] =
    result.map((field) => fuzzysort.highlight(field))

  const tooltip = (tab.discarded ? `[discarded] ` : '')
    + `${tab.title}\n${tab.url}`

  return `
    <button class='tab' data-id='${tab.id}' title='${tooltip}'>
      <span class='label'>${label ?? tab.label}</span>
      <img class='favicon' src='${tab.favIconUrl ?? defaultFavicon}'/>
      <div class='indicator ${tab.discarded ? 'discarded' : 'active'}'></div>
      <span class='title'>${title ?? tab.title}</span>
      <span class='url'>${url ?? tab.url}</span>
    </button>
  `
}

export const updateSearchResults = (state) => {
  const container = document.getElementById('searchResults')
  container.innerHTML = state.results.map(tabView).join('')
}
