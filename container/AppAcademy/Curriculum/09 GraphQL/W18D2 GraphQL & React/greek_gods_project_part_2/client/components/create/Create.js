import React, { Component } from 'react'
import GodCreate from './GodCreate'
import AbodeCreate from './AbodeCreate'
import EmblemCreate from './EmblemCreate'

class Create extends Component {
  constructor(props) {
    super(props)

    this.state = {
      createType: 'god'
    }

    this.updateSelection = this.updateSelection.bind(this)
  }

  updateSelection(e) {
    e.preventDefault()
    this.setState({ createType: e.target.value })
  }

  render() {
    let form

    if (this.state.createType === 'god') {
      form = <GodCreate />
    } else if (this.state.createType === 'abode') {
      form = <AbodeCreate />
    } else if (this.state.createType === 'emblem') {
      form = <EmblemCreate />
    }

    return (
      <div className="styled-select slate">
        <select onChange={this.updateSelection}>
          <option value="god">God</option>
          <option value="abode">Abode</option>
          <option value="emblem">Emblem</option>
        </select>
        <h4>Create a new {this.state.createType}</h4>
        {form}
      </div>
    )
  }
}

export default Create
