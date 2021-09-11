import React from "react"
import WelcomeBar from "./nav_bar/welcome_bar_container"
import NavBarContainer from "./nav_bar/nav_bar_container"
import ChirpIndexContainer from "./chirps/chirp_index_container"
import Home from "./home/home"
import SignupContainer from "../components/session/signup_container"
import { AuthRoute, ProtectedRoute } from "../utils/route_utils"
import { Route } from "react-router-dom"

export default () => (
  <div>
    <Route path="/" component={NavBarContainer} />
    <Route exact path="/" component={Home} />
    <ProtectedRoute path="/chirps" component={ChirpIndexContainer} />
    <AuthRoute path="/signup" component={SignupContainer} />
  </div>
)
