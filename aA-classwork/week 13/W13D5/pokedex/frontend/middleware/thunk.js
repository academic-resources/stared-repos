const thunk = store => next => action => {
  const { dispatch, getState } = store
  if (typeof action === 'function') return action(dispatch, getState)
  return next(action)
}

export default thunk
