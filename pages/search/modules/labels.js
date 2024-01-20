const labels = {
  /* tabId: label, */
}

const lettersOrder = 'lkjhyuionm'

/* */

const digits2label = (digits) => [...digits]
  .map((digit) => lettersOrder[digit])
  .join('')

export const id2label = (id, tabs) => {
  if (!labels[id]) {
    const label = Object.keys(labels).length
    labels[id] = String(label)
  }

  const keyLength = String(tabs?.length).length
  const digits = String(labels[id]).padStart(keyLength, 0)
  return digits2label(digits)
}

/* */

const label2digits = (label) => [...label]
  .map((letter) => [...lettersOrder].findIndex((x) => x === letter))
  .join('')

export const label2id = (label) => {
  const paddedDigits = label2digits(label)
  const digits = String(parseInt(paddedDigits))

  const [key] = Object.entries(labels)
    .find(([_, value]) => value === digits)

  return parseInt(key)
}
