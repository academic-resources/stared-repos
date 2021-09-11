import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.css';
import Home from './components/Home';
import Navbar, { NavBar } from './components/NavBar'
import Strains from './components/strains/Strains'
import PrivateRoute from './components/PrivateRoute'
import Login from './components/Login';
import SignUp from './components/SignUp'


const App =() =>{
  return (
    <Router>
    <div className="App">
      
    
      <Fragment>
        <NavBar/>
        <div className="container">
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path='/sign-up' component={SignUp}/>
        <PrivateRoute  path="/protected" component={Login}/>
        
        
        <PrivateRoute  path="/protectedstrains" component={Strains}/>
        
      </Switch>
        </div>
      </Fragment>
   
    
    </div>
    </Router>
  );
}

export default App;
