import React from "react";
import { Route, Switch } from "react-router-dom";
import Register from "./Register";
import CreatePost from "./posts/CreatePost";
import PostIndex from "./posts/PostIndex";

const App = () => (
  <div>
    <Switch>
      <Route path="/new" component={CreatePost} />
      <Route path="/register" component={Register} />
      <Route path="/" component={PostIndex} />
    </Switch>
  </div>
);

export default App;
