import React from 'react';
import ProductIndex from './products/ProductIndex';
import ProductDetail from './products/ProductDetail';
import CreateProduct from './products/CreateProduct';
import { Route, HashRouter, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'
import Nav from './Nav'

import AuthRoute from '../util/route_util'


function App() {
  return (
      <HashRouter>
       <Route path="/" component={Nav} />
        <h1>Online Store</h1>
        <Switch>
          <AuthRoute exact path="/products/create" component={CreateProduct}  />
          <AuthRoute exact path="/products/:product_id" component={ProductDetail}  />
          <AuthRoute exact path="/login" component={Login} routeType="auth"  />
          <AuthRoute exact path="/register" component={Register} routeType="auth"  />
          <AuthRoute path="/" component={ProductIndex} />
        </Switch>
      </HashRouter>
  );
}

export default App;
