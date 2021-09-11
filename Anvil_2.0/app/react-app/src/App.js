import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { useDispatch } from "react-redux";
import { LandingPage, Home } from "./components";

import { restoreUser } from "./store/reducers/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
        <Route path="/">
          <div className="h-screen">
            <LandingPage />
          </div>
        </Route>
        <Route>
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
