const fuzzysort = window.fuzzysort

/* */
const highlightTagName = crypto.randomUUID().slice(0, 4)

const unescapeHighlight = (innerText) =>
  innerText
  .replaceAll(`&lt;${highlightTagName}&gt;`, '<b>')
  .replaceAll(`&lt;/${highlightTagName}&gt;`, '</b>')

/* https://png-pixel.com/ */
const defaultFavicon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='

const tabView = (result) => {
  const tab = result.obj
  const [label, title, url] = result.map((field) =>
    fuzzysort.highlight(field, `<${highlightTagName}>`, `</${highlightTagName}>`))

  /* Parts */

  const labelSpan = document.createElement('span')
  labelSpan.classList.add('label')
  labelSpan.textContent = label ?? tab.label
  labelSpan.innerHTML = unescapeHighlight(labelSpan.innerHTML)

  const faviconImg = document.createElement('img')
  faviconImg.classList.add('favicon')
  faviconImg.src = tab.favIconUrl ?? defaultFavicon

  const indicatorDiv = document.createElement('div')
  indicatorDiv.classList.add('indicator',
    tab.discarded ? 'discarded' : 'active')

  const titleSpan = document.createElement('span')
  titleSpan.classList.add('title')
  titleSpan.textContent = title ?? tab.title
  titleSpan.innerHTML = unescapeHighlight(titleSpan.innerHTML)

  const urlSpan = document.createElement('span')
  urlSpan.classList.add('url')
  urlSpan.textContent = url ?? tab.url
  urlSpan.innerHTML = unescapeHighlight(urlSpan.innerHTML)

  const parts = [
    labelSpan,
    faviconImg,
    indicatorDiv,
    titleSpan,
    urlSpan,
  ]

  /* Button */

  const tabButton = document.createElement('button')
  tabButton.classList.add('tab')
  tabButton.dataset.id = tab.id
  tabButton.title =
    (tab.discarded ? '[discarded] ' : '') + `${tab.title}\n${tab.url}`

  parts.forEach((part) => tabButton.appendChild(part))

  return tabButton
}

export const updateSearchResults = (state) => {
  const container = document.getElementById('searchResults')
  container.innerHTML = ''

  state.results.forEach((result) =>
    container.appendChild(tabView(result)))
}

export const enableFaviconFallback = () => {
  window.addEventListener('error', (e) => {
    if (e.target.tagName === 'IMG') {
      e.target.src = defaultFavicon
    }
  }, true)
}
