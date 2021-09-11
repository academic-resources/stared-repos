import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class PokemonForm extends Component {
  constructor(props) {
    super(props)
    this.state = props.pokemon
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleInputChange(event, field) {
    this.setState({
      [field]:
        field === 'moves' ? event.target.value.split(' ') : event.target.value
    })
  }

  handleDefense(field) {
    return e => {
      this.setState({
        [field]: e.target.value
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.action(this.state).then(pokemon => {
      this.props.history.push(`/pokemon/${pokemon.id}`)
    })
  }

  showErrors() {
    if (this.props.errors)
      return this.props.errors.map((err, i) => <li key={i}>{err}</li>)
  }

  render() {
    const typeOptions = [
      'fire',
      'electric',
      'normal',
      'ghost',
      'psychic',
      'water',
      'bug',
      'dragon',
      'grass',
      'fighting',
      'ice',
      'flying',
      'poison',
      'ground',
      'rock',
      'steel'
    ].map(type => (
      <option key={type} value={type}>
        {type}
      </option>
    ))

    return (
      <section className="pokemon-detail">
        <div className="logo" />
        <ul>{this.showErrors()}</ul>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Name"
            onChange={event => this.handleInputChange(event, 'name')}
            type="text"
            value={this.state.name}
          />
          <input
            placeholder="Image URL"
            onChange={event => this.handleInputChange(event, 'image_url')}
            type="text"
            value={this.state.image_url}
          />
          <input
            placeholder="Attack"
            onChange={event => this.handleInputChange(event, 'attack')}
            type="number"
            value={this.state.attack}
          />
          <input
            placeholder="Defense"
            onChange={this.handleDefense('defense')}
            type="number"
            value={this.state.defense}
          />
          <select
            onChange={event => this.handleInputChange(event, 'poke_type')}
            value={this.state.poke_type}
          >
            {typeOptions}
          </select>
          <input
            placeholder="Moves"
            onChange={event => this.handleInputChange(event, 'moves')}
            type="text"
            value={this.state.moves.join(' ')}
          />
          <button>Submit</button>
        </form>
      </section>
    )
  }
}

export default withRouter(PokemonForm)
