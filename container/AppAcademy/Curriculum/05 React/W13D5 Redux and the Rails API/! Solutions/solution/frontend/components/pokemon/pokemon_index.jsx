import React, { Component } from 'react';
import { Route } from 'react-router-dom';

import PokemonIndexItem from './pokemon_index_item';
import LoadingIcon from './loading_icon';
import PokemonFormContainer from './pokemon_form_container';
import PokemonDetailContainer from './pokemon_detail_container';

class PokemonIndex extends Component {
  componentDidMount() {
    this.props.requestAllPokemon();
  }

  render() {
    const { pokemon, loading } = this.props;

    if (loading) { return <LoadingIcon />; }

    return (
      <section className="pokedex">
        <Route exact path="/" component={PokemonFormContainer} />
        <Route
          path="/pokemon/:pokemonId"
          component={PokemonDetailContainer}
        />
        <ul>
          {pokemon.map(poke => <PokemonIndexItem key={poke.id} pokemon={poke} />)}
        </ul>
      </section>
    );
  }
}

export default PokemonIndex;
