import React from 'react'

class AutoComplete extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      input: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  render () {
    return (
      <div>
        <h1>AutoComplete</h1>
        <input type="text" onChange={this.handleInputChange}/>
        <ul>
          {this.props.names
          .filter( name => name.indexOf(this.state.input) !== -1 )
          .map((name, i) => {
            return <li key={i}>{name}</li>
          })}
        </ul>
      </div>
    )
  }

  handleInputChange (e) {
    const value = e.currentTarget.value
    this.setState({input: value})
  }
}

export default AutoComplete