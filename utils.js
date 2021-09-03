export const rCompose = (functions) => functions
  .reduce((fn1, fn2) => (state) => (...args) => fn2(state)(fn1(state)(...args)))

