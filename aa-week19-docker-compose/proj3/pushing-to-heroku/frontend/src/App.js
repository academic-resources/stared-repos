import React, { useContext } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { PrivateRoute } from './routesUtil';
import LoginPanel from './LoginPanel';
import PokemonBrowser from './PokemonBrowser';
import { PokemonContext } from './PokemonContext';

const App = () => {
  const { needLogin } = useContext(PokemonContext);

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={LoginPanel} />
        <PrivateRoute
          path="/"
          component={PokemonBrowser}
          needLogin={needLogin}
        />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
