import React from "react"
import { withRouter } from "react-router-dom"

class PokemonForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      image_url: "",
      poke_type: "select",
      attack: "0",
      defense: "0",
      moves: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateMoves = this.updateMoves.bind(this)
  }

  update(property) {
    return e => this.setState({ [property]: e.target.value })
  }

  updateMoves(index) {
    return e => {
      // debugger
      this.state.moves[index] = e.target.value
      this.setState({ moves: this.state.moves })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.createPokemon(this.state).then(newPokemon => {
      // debugger
      this.props.history.push(`pokemon/${Object.keys(newPokemon)[0]}`)
    })
  }

  displayErrors() {
    if (this.props.errors) {
      return this.props.errors.map(error => {
        return <li key={error}>{error}</li>
      })
    }
  }

  render() {
    const TYPES = [
      "fire",
      "electric",
      "normal",
      "ghost",
      "psychic",
      "water",
      "bug",
      "dragon",
      "grass",
      "fighting",
      "ice",
      "flying",
      "poison",
      "ground",
      "rock",
      "steel"
    ]

    return (
      <div>
        <ul>{this.displayErrors()}</ul>
        <form onSubmit={this.handleSubmit} className="pokemon-form">
          <input
            type="text"
            value={this.state.name}
            placeholder="Name"
            onChange={this.update("name")}
          />
          <input
            type="text"
            value={this.state.image_url}
            placeholder="Image URL"
            onChange={this.update("image_url")}
          />
          <select
            value={this.state.poke_type}
            onChange={this.update("poke_type")}
          >
            <option value="select">Select Pokemon Type</option>
            {TYPES.map((type, i) => {
              return (
                <option key={i} value={type}>
                  {type}
                </option>
              )
            })}
          </select>

          <input
            type="number"
            value={this.state.attack}
            placeholder="Attack"
            onChange={this.update("attack")}
          />
          <input
            type="number"
            value={this.state.defense}
            placeholder="Defense"
            onChange={this.update("defense")}
          />
          <input
            type="text"
            value={this.state.moves[0]}
            placeholder="Move 1"
            onChange={this.updateMoves(0)}
          />
          <input
            type="text"
            value={this.state.moves[1]}
            placeholder="Move 2"
            onChange={this.updateMoves(1)}
          />
          <button>Create Pokemon</button>
        </form>
      </div>
    )
  }
}

export default withRouter(PokemonForm)
