import React from "react";

function ItemsList(props) {
  function routeToItem(ev, item) {
    ev.preventDefault();
    props.history.push(`/item-list/${item.id}`);
  }
  return (
    <div className="items-list-wrapper">
      {props.items.map(item => (
        <div
          onClick={ev => routeToItem(ev, item)}
          className="item-card"
          key={item.id}
        >
          <img
            className="item-list-image"
            src={item.imageUrl}
            alt={item.name}
          />
          <p>{item.name}</p>
          <p>${item.price}</p>
        </div>
      ))}
    </div>
  );
}

export default ItemsList;
