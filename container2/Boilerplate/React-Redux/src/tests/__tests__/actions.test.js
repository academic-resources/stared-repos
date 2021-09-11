import * as actions from '../../actions/'

describe('Actions', () => {
  it('should handle FOO', () => {
    const expectedAction = {
      type: 'FOO',
      payload: 'bar'
    }
    expect(actions.someAction()).toEqual(expectedAction)
  })

  it('should handle BAZ', () => {
    expect(actions.otherAction()).toEqual({ type: 'BAZ' })
  })
})
