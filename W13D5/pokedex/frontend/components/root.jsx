import React from 'react';
import { Provider } from 'react-redux'
import PokemonIndexContainer from './pokemon/pokemon_index_container'
             //normally a prop, destructuring using {store}
const Root = ({store}) => {
    return (
        <Provider store={store}>
            <PokemonIndexContainer />
        </Provider>
    )   
}

export default Root;