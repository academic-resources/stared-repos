import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import DisplayForm from './DisplayForm'
import FormikForm from './Form'
import UsersData from './UsersData'

function App() {

  const [users, setUsers] = useState(UsersData);

  console.log(users);

  const addUser = user => {
    setUsers( [...users, user] );
  };
    
  return (
    <div>
      <FormikForm component={FormikForm} addUser={addUser}/>
    </div>
  );
}

export default App;