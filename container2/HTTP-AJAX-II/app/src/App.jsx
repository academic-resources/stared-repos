import React from 'react';
import axios from 'axios';
import { Route, Link, NavLink } from 'react-router-dom';
import Home from './components/Home';
import ItemsList from './components/ItemsList';
import Item from './components/Item';


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    axios.get('http://localhost:3333/items')
      .then(response => {
        this.setState({ items: response.data });
      })
      .catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <div className="App">
        <nav>
          <Link className="some-link" to="/">
            <h1 className="store-header">Trinkets</h1>
          </Link>
          <div className="nav-links">
            <NavLink exact to="/">
              Home
            </NavLink>
            <NavLink to="/item-list">
              Shop
            </NavLink>
            <NavLink to="/item-form">
              <button className="md-button">Add Item</button>
            </NavLink>
          </div>
        </nav>

        <Route exact path="/" component={Home} />
        <Route 
          exact 
          path="/item-list"
          render={(props) => <ItemsList {...props} items={this.state.items} />} 
        />
        <Route 
          path="/item-list/:id" 
          render={(props) => <Item items={this.state.items} {...props} />} 
        />
      </div>
    );
  }
}

export default App;
