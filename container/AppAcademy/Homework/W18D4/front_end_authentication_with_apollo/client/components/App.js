import React from "react";
import { Route } from "react-router-dom";
import PostIndex from "./posts/PostIndex";
import CreatePost from "./posts/CreatePost"; 
import Register from "./register"

const App = () => (
  <div>
    <h1>Hellloooo World!</h1>
    <Route exact path="/posts/new" component={ CreatePost } />
    <Route exact path="/posts" component={ PostIndex } />
    <Route exact path="/" component={ Register } />

  </div>
);

export default App;
