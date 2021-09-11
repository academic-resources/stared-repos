import React from 'react';
import { Route, Redirect } from 'react-router-dom';

/*

We want PrivateRoute to be a sort of replacement/upgrade for the Route component
We want it to have the same API as Route
We will have it render a Route and pass all the props through into the Route component
If the user is logged in, we will render the component that the Route received
Otherwise, we will redirect the user to the Login page

*/

export default function PrivateRoute({ component: Component, ...rest }) {

  return (

    <div>
      <Route {...rest} render={() => {
        if (localStorage.getItem('token'))
          return <Component />
        return <Redirect to='/login'/>
      }}/>
    </div>

  )

}
