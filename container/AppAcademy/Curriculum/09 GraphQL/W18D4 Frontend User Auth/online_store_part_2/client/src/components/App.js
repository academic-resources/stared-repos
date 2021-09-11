import React from 'react';
import { Route, Switch } from 'react-router-dom'
import ProductIndex from './products/ProductIndex'
import ProductDetail from './products/ProductDetail'
import CreateProduct from './products/CreateProduct'
import Login from './Login'
import Register from './Register'
import AuthRoute from '../util/route_util'
import Nav from './Nav'

const App = () => {
  return (
    <div>
      <h1>Online Store</h1>
      <Nav />
      <Switch>
        <AuthRoute exact path="/login" component={Login} routeType="auth" />
        <AuthRoute exact path="/register" component={Register} routeType="auth" />
        <AuthRoute exact path="/products/new" component={CreateProduct} />
        <Route path="/products/:productId" component={ProductDetail} />
        <Route path="/" component={ProductIndex} />
      </Switch>
    </div>
  );
};

export default App;