import React from 'react';
import { Route } from 'react-router-dom';

import Login from './components/Login';
import ProtectedRoute from './components/PrivateRoute';
import UserList from './components/UserList';

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">

      <Route path="/login" component = {Login} />
      <ProtectedRoute path="/users" component={UserList} />

    </div>
  );
}

export default App;
