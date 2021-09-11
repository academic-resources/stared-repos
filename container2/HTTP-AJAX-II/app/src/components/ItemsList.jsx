import React from 'react';
import { Link } from 'react-router-dom';

function ItemsList(props) {
  return (
    <div className="items-list-wrapper">
      {props.items.map(item => (
        <Link className="some-link" to={`/item-list/${item.id}`} key={item.id}>
          <div className="item-card">
            <img
              className="item-list-image"
              src={item.imageUrl}
              alt={item.name}
            />
            <p>{item.name}</p>
            <p>${item.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ItemsList;
