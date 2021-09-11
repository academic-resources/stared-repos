import React from 'react'
import { Provider } from 'react-redux'
import PokemonIndexContainer from './pokemon/pokemon_index_container'
import { HashRouter, Route } from 'react-router-dom'
import PokemonCreateFormContainer from './pokemon/pokemon_create_form_container'

const Root = ({ store }) => {
  return (
    <Provider store={store}>
      <HashRouter>
        <Route path="/" component={PokemonIndexContainer} />
        <Route exact path="/" component={PokemonCreateFormContainer} />
        <Route exact path="/pokemon" component={PokemonCreateFormContainer} />
      </HashRouter>
    </Provider>
  )
}

export default Root
