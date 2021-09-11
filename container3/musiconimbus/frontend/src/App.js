import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import { ReactComponent as AngryCloud } from "./components/images/musiconimbus_404.svg"
import Home from "./components/Home"
import LoginFormPage from "./components/LoginFormPage";
import SignupFormPage from "./components/SignupFormPage";
import Navigation from "./components/Navigation";
import Dashboard from "./components/Dashboard";
import Explore from "./components/Explore";
import AlbumView from "./components/AlbumView";
import AudioPlayer from "./components/AudioPlayer";
import AddAlbum from "./components/AddAlbum";
import * as sessionActions from "./store/session";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const sessionUser = useSelector(state => state.session.user);
  const nowPlaying = useSelector(state => state.nowPlaying.song);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <LoginFormPage />
          </Route>
          <Route exact path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard sessionUser={sessionUser}/>
          </Route>
          <Route exact path="/explore">
            <Explore sessionUser={sessionUser}/>
          </Route>
          <Route exact path="/albums/new">
            <AddAlbum />
          </Route>
          <Route exact path="/albums/:albumId">
            <AlbumView sessionUser={sessionUser}/>
          </Route>
          <Route exact path="/albums/:albumId/edit">
            <AddAlbum sessionUser={sessionUser}/>
          </Route>
          <Route>
            <div className="main">
              <h1>404'd!</h1>
              <p>The resource you requested does not exist.</p>
              <AngryCloud className="logo"/>
            </div>
          </Route>
        </Switch>
      )}
      {sessionUser && nowPlaying && (
        <AudioPlayer nowPlaying={nowPlaying} />
      )}
    </>
  );
}

export default App;
