import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from './Login';
import Strains from './strains/Strains';


export const PrivateRoute = ({ component: Component, ...rest}) => {
    return (
       <Route
       {...rest}
       render = {props => {
           if (localStorage.getItem('token')){
               return <Component {...props}/>
           }else {
               return <Redirect to="/"/>
           }
       }}
       />
    )
}

export default PrivateRoute;
