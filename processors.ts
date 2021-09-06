export const clearLines = (pixels) => (map) => map.map((row, i) => {
  if (Math.floor(i/pixels) % 2 === 0) {
    return row
  } else {
    return row.map(() => undefined)
  }
})

export const clearEveryNthLine  = (pixels) => (map) => map.map((row, i) => {
  if (i % pixels !== 0) {
    return row
  } else {
    return row.map(() => undefined)
  }
})
