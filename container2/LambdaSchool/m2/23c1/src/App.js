import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import SavedTMList from './SavedTMList'
import Form from './form'
import logo from './logo.svg';
import './App.css';
import TeamMembersData from './teamMembersData'

function App() {


  const [users, setUsers] = useState(TeamMembersData);

  console.log(users);

  const addUser = user => {
    setUsers( [...users, user] );
  };
    
  return (
    <div>
      <Form addUser={addUser}/>
      <SavedTMList list={users} />
    </div>
  );
}

export default App;
