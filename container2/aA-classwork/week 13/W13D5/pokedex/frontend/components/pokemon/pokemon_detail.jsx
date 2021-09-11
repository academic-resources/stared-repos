import React from "react"
import { Route, Link } from "react-router-dom"
import ItemDetailContainer from "./item_detail_container"
import LoadingSpinner from "../loading_spinner"

class PokemonDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.requestSinglePokemon(this.props.match.params.id)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.props.requestSinglePokemon(this.props.match.params.id)
    }
  }

  render() {
    const { items, pokemon } = this.props
    if (!items) return null
    // debugger
    let spinner
    if (this.props.loading) {
      spinner = <LoadingSpinner />
    }
    let itemList = items.map((item, i) => {
      return (
        <Link to={`/pokemon/${pokemon.id}/items/${item.id}`} key={item.name}>
          <div>
            <img src={item.image_url} alt="poke_item_img" width="100px" />
          </div>
        </Link>
      )
    })
    let pokeInfo, pokeMoves
    if (this.props.pokemon.moves) {
      const { pokemon } = this.props
      // debugger
      // if (pokemon.moves) {
      //   pokeMoves = pokemon.moves.map((move, i) => {
      //     return <span key={i}>{move}</span>
      //   })
      // }
      // console.log(pokemon.image_url)

      pokeInfo = (
        <div className="pokemon-detail">
          <li>
            <h2>{pokemon.name}</h2>
          </li>
          <img src={pokemon.image_url} alt={pokemon.image_url} />
          <li>Attack: {pokemon.attack}</li>
          <li>Defense: {pokemon.defense}</li>
          <li>Type: {pokemon.poke_type}</li>
          <li>Moves: {pokemon.moves.join(", ")}</li>
        </div>
      )
    }
    // debugger

    return (
      <div className="pokemon-detail-container">
        {spinner}
        {pokeInfo}
        <div className="item-container">
          <div className="item-images">{itemList}</div>
          <div>
            <Route
              path="/pokemon/:id/items/:itemId"
              component={ItemDetailContainer}
            />
          </div>
        </div>
      </div>
    )
  }
}

export default PokemonDetail
