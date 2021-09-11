import React from "react";
import SessionLinks from "./session/session_links";
import SessionForm from "./session/session_form_container";
import SoloLogin from "./session/session_solo_login.jsx";
import SoloSignup from "./session/session_solo_signup.jsx";
import HomePage from "./homepage.jsx";
import NoteBookHome from "./notebooks/notebook_home";
import NoteHome from "./notes/notes_home";
import TagHome from "./tags/tag_home";
import { AuthRoute, ProtectedRoute } from "../util/route_util.jsx";
import { Route, Link, Redirect, Switch, HashRouter } from "react-router-dom";

const App = () => (
  <div>
    <ProtectedRoute path="/notes" component={NoteHome} />
    <ProtectedRoute path="/notebooks" component={NoteBookHome} />
    <ProtectedRoute path="/tags" component={TagHome} />
    <AuthRoute exact path="/" component={HomePage} />
    <AuthRoute path="/login" component={SoloLogin} />
    <AuthRoute path="/signup" component={SoloSignup} />
  </div>
);

export default App;
