import React from 'react'
import { Provider } from 'react-redux'
import PokemonIndex from './pokemon/pokemon_index_container'
import { HashRouter, Route } from 'react-router-dom'

const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter >
      <Route component={PokemonIndex} path='/' />
    </HashRouter>
  </Provider>
)

export default Root