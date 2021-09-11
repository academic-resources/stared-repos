import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addFriend } from '../actions';
import './AddFriend.css';

class AddFriend extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      friends: '',
      email: '',
      index: '',
      photo: ''
    };
  }

  newFriend = event => {
    event.preventDefault();
    const friendCount = Math.floor(Math.random() * (50 - 1)) + 1;
    const newFriend = {
      name: this.state.name,
      friends: friendCount,
      email: this.state.email,
      photo: 'https://imgur.com/UnsM6MV.jpg'
    };
    this.props.dispatch(addFriend(newFriend));
    this.setState({
      name: '',
      friends: '',
      email: '',
      index: '',
      photo: ''
    });
  };

  handleName = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleEmail = event => {
    this.setState({
      email: event.target.value
    });
  };

  render() {
    return (
      <div className="input-wrapper">
        <span className="add-a-friend">Add a Friend</span>
        <input
          className="input-name"
          placeholder="Name"
          value={this.state.name}
          onChange={this.handleName}
        />
        <input
          placeholder="Email"
          value={this.state.email}
          onChange={this.handleEmail}
        />
        <button onClick={this.newFriend}>
          <svg fill="#000000" height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5 11h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/>
          </svg>
        </button>
      </div>
    );
  }
}

export default connect()(AddFriend);
