const letterOrder = 'lkjhyuionm'

export const fromNumber = (number, length) => {
  const labelLength = String(length).length
  const digits = String(number).padStart(labelLength, 0)
  return [...digits]
    .map((digit) => letterOrder[digit])
    .join('')
}
