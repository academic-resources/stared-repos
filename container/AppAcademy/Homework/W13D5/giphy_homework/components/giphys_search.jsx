import React from 'react';

import GiphysIndex from './giphys_index';


class GiphysSearch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (field) {
    return e => {
      this.setState({ 
        [field]: e.target.value
      })
    }
  }

  handleSubmit (e) {
    e.preventDefault()
    const searchTerm = this.state
    // this.props.fetchSearchGiphys({ searchTerm })
      // .then(result => {debugger})
  }

  render () {
    return (
      <form action="">
        <h1>Giphy Search</h1>
        <label>Search:
          <input type="text" onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Search" onClick={this.handleSubmit}/>
      </form>
    )
  }
  
}

export default GiphysSearch