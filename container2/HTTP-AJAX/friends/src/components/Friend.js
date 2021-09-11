import React from 'react';
import './Friend.css';

const Friend = friend => {
  return (
    <li>
      <div className="thumbnail">
        <img src={friend.photo} />
      </div>
      <div className="hover-btn" id={friend.state.hoverBtn ? "show" : "hide" }>
        <svg className="hover-btn-" fill="#FFFFFF" height="128" viewBox="0 0 24 24" width="128" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </div>
      <div 
        className="friend-wrapper"
        onClick={() => friend.handleClick(friend.index)}
        onMouseEnter={friend.handleMouseEnter}
        onMouseOut={friend.handleMouseOut}>
        <span className="friend-name">{friend.name}</span>
        <br />
        <span className="info">
          {friend.friends} mutual friends<br />
          {friend.email}
        </span>
      </div>
    </li>
  );
};

export default Friend;
