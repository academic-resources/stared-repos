import React from 'react';
import {
  Route,
  Link,
  NavLink
} from 'react-router-dom';

import Red from './red';
import Green from './green';
import Blue from './blue';
import Violet from './violet';

class Rainbow extends React.Component {
  render() {
    return (
      <div>
        <h1>Rainbow Router!</h1>
        {/* Your links should go here */}
        {/* <Link to='/red' >Red Only</Link> */}
        {/* <Link to='/green' >Green</Link> */}
        {/* <Link to='/blue' >Blue Only</Link> */}
        {/* <Link to='/violet' >Violet</Link> */}
        <NavLink exact to='/red' >Red Only</NavLink>
        <NavLink to='/green' >Green</NavLink>
        <NavLink exact to='/blue' >Blue Only</NavLink>
        <NavLink to='/violet' >Violet</NavLink>
        <div id="rainbow">
          {/* Your routes should go here */}
          <Route path="/red" component={Red} />
          <Route path="/green" component={Green} />
          <Route path="/blue" component={Blue} />
          <Route path="/violet" component={Violet} />

        </div>
      </div>
    );
  }
};

export default Rainbow;
