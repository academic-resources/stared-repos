import React from 'react'
import { mount } from 'enzyme'
import { MemoryRouter } from 'react-router-dom'

import { Nav } from './../../containers'

describe('Links', () => {
  let wrap
  beforeEach(() => {
    wrap = mount(
      <MemoryRouter initialEntries={['/']} initialIndex={0}>
        <Nav />
      </MemoryRouter>)
  })

  describe('Links', () => {
    it('Home', () => {
      const home = wrap.find('Link').findWhere(n => n.prop('to') === '/')
      expect(home).toHaveLength(1)
    })

    it('About', () => {
      const about = wrap.find('Link').findWhere(n => n.prop('to') === '/about')
      expect(about).toHaveLength(1)
    })
  })
})
