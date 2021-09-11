import React from 'react';
import Header from './Header';
import FriendsList from './FriendsList';
import AddFriend from './AddFriend';
import './App.css';

const App = () => {
  return (
    <div className="app">
      <Header />
      <FriendsList />
      <AddFriend />
    </div>
  );
};

export default App;
