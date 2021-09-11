import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({
  path,
  component: Component,
  needLogin,
  componentProps,
}) => (
  <Route path={path} render={props =>
    needLogin === true ? (
      <Redirect to="/login" />
    ) : (
      <Component {...props} {...componentProps} />
    )}
  />
);
