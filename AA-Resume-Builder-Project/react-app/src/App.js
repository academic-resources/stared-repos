import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import UsersList from './components/UsersList';
import User from './components/User';
import AboutPage from './components/AboutPage';
import { authenticate } from './services/auth';

// Component import line
import { LandingPage, MainPage, Templates, Management, Resume } from './components';
import EditingPage from './components/EditingPage/EditingPage';
import { saveUser } from './store/user';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(saveUser(user));
      }
      setLoaded(true);
    })();
  });

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {authenticated && (
        <NavBar setAuthenticated={setAuthenticated} authenticated={authenticated} />
      )}
      <Switch>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <MainPage />
        </ProtectedRoute>
        <ProtectedRoute path="/main" exact={true} authenticated={authenticated}>
          <MainPage />
        </ProtectedRoute>
        <ProtectedRoute path="/resumes" exact={true} authenticated={authenticated}>
          <Management />
        </ProtectedRoute>
        <ProtectedRoute path="/resumes/:resumeId" exact={true} authenticated={authenticated}>
          <Resume />
        </ProtectedRoute>
        <ProtectedRoute path="/templates" exact={true} authenticated={authenticated}>
          <Templates />
        </ProtectedRoute>
        <ProtectedRoute path="/resume/:userId/create" exact={true} authenticated={authenticated}>
          <EditingPage />
        </ProtectedRoute>
        <ProtectedRoute path="/resume/:userId/edit" exact={true} authenticated={authenticated}>
          <EditingPage />
        </ProtectedRoute>
        <Route path="/about">
          <AboutPage />
        </Route>
        <Route path="/">
          <LandingPage authenticated={authenticated} setAuthenticated={setAuthenticated} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
