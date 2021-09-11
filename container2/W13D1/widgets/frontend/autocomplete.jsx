import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class AutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = {inputVal: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleChange(event) {
    this.setState({inputVal: event.currentTarget.value});
  }

  handleSelect(event) {
    this.setState({inputVal: event.currentTarget.innerText});
  }

  matchingNames() {
    const names = [];
    this.props.names.forEach(name => {
      if(name.slice(0, this.state.inputVal.length) === this.state.inputVal) names.push(name);
    });
    if(names.length === 0) names.push("No matches");
    return names;
  }

  render() {
    const nameLis = this.matchingNames().map((name, idx) => {
      return (<li key={idx} onClick={this.handleSelect}>{name}</li>);
    });
    return (
      <div className='autocomplete-container'>
        <h1>AutoComplete</h1>
        <div className='autocomplete'>
          <input onChange={this.handleChange} value={this.state.inputVal} placeholder='Search...' type="text" className='autocomplete-input'/>
          <ul className='names-list'>
            <ReactCSSTransitionGroup transitionName='auto' transitionEnterTimeout={500} transitionLeaveTimeout={500}>
              {nameLis}
            </ReactCSSTransitionGroup>
          </ul>
        </div>
      </div>
    );
  }
}