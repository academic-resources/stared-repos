const initialState = {}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'FOO':
      return { ...state, message: action.payload }
    case 'BAZ':
      return { ...state, message: 'hello' }
    default:
      return state
  }
}
