import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getFriends, removeFriend } from '../actions';
import Friend from './Friend';
import './FriendsList.css';

class FriendsList extends Component {
  constructor(){
    super();
    this.state = {
      hoverBtn: false
    }
  }
  componentDidMount() {
    this.props.getFriends();
  }
  handleClick(index) {
    this.props.removeFriend(index);
  }
  handleMouseEnter() {
    this.setState({ hoverBtn: true })
  }
  handleMouseOut() {
    this.setState({ hoverBtn: false })
  }
  render() {
    const { friends } = this.props;
    return (
      <div>
        <div className="friends-list-header">
          <span className="span-fl">
            <i>Friends List</i>
          </span>
        </div>
        <div className="friends-list">
          <ul>
            {friends.map((friend, i) => {
              return <Friend 
                handleClick={this.handleClick.bind(this)}
                handleMouseEnter={this.handleMouseEnter.bind(this)}
                handleMouseOut={this.handleMouseOut.bind(this)}
                state={this.state}
                key={i}
                index={i}
                {...friend}
              />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  friends: state.friends
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getFriends, removeFriend }, dispatch); 
};

export default connect(mapStateToProps, mapDispatchToProps)(FriendsList);
