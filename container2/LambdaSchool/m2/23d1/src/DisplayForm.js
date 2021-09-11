import React from 'react';
import { Link } from 'react-router-dom';

const DisplayForm = props => (
  <div className="saved-list">
    <h3>Saved User List:</h3>
    <ul>
    {props.list.map(user => (
      <li><span>{user.name}, </span><span>{user.email}</span></li>
    ))}
      </ul>
  </div>
);


export default DisplayForm;
