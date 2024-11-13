export const printMap = (arr) => arr.map((row) => row.join(' ')).join('\n')
export const rCompose = (functions) => functions
  .reduce((fn1, fn2) => (state) => (...args) => fn2(state)(fn1(state)(...args)))

export const compose = (functions) => functions
  .reduce((fn1, fn2) => (...args) => fn2(fn1(...args)))

export const constant = (a) => () => a
