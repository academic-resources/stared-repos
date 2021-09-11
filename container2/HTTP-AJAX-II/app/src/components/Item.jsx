import React from 'react';
import ItemDescription from './ItemDescription';
import ItemShipping from './ItemShipping';
import { Route, NavLink } from 'react-router-dom';

function Item(props) {
    const item = props.items.find(item => item.id.toString() === props.match.params.id);

    return (
        <div className="item-wrapper">
            <div className="item-header">
                <div className="image-wrapper">
                    <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="item-title-wrapper">
                    <h2>{item.name}</h2>
                    <h4>${item.price}</h4>
                </div>
            </div>
            <nav className="item-sub-nav">
                <NavLink exact to={`/item-list/${item.id}`}>Description</NavLink>
                <NavLink to={`/item-list/${item.id}/shipping`}>Shipping</NavLink>
            </nav>
            <Route
                exact
                path="/item-list/:id" 
                render={(props) => <ItemDescription {...props} item={item} />}
            />
            <Route 
                path="/item-list/:id/shipping" 
                render={(props) => <ItemShipping {...props} item={item} />}
            />
            <button className="md-button">
                Delete Item
            </button>
            <button className="md-button">
                Update Item
            </button>
        </div>
    );
}

export default Item;
