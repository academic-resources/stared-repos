import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";

const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>
      <Route path="/profile/:profileId">
        <Profile />
      </Route>
      <Route path="/explore/:searchParam">
        <Explore />
      </Route>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="*">
        <h1> 404 Page not found</h1>
      </Route>
    </Switch>
  </BrowserRouter>
);

export default Routes;
