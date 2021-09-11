import React from 'react';
import { Link } from 'react-router-dom';

const SavedTMList = props => (
  <div className="saved-list">
    <div className="home-button"><Link className="home-button" to="/">Home</Link></div>
    <h3>Saved Team Members List:</h3>
    <ul>
    {props.list.map(user => (
      <li><span>{user.name}, </span><span>{user.email}</span>, <span>{user.role}</span></li>
    ))}
      </ul>
  </div>
);


export default SavedTMList;
