// Middleware for extra debugging info
const logger = (store) => (next) => (action) =>   {
  console.group(action.type)
  console.log('The action is: ', action)
  console.log('The new state is ', store.getState())
  console.groupEnd()
  return next(action)
}

export default logger