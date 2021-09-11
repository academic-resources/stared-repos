import reducer from '../../reducers/'

describe('Counter reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({})
  })

  it('should handle FOO', () => {
    expect(reducer({}, { type: 'FOO', payload: 'bar' }))
      .toEqual({ message: 'bar' })
  })

  it('should handle BAZ', () => {
    expect(reducer({}, { type: 'BAZ' })).toEqual({ message: 'hello' })
  })
})
