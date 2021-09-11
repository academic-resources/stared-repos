import React from "react"

const ItemDetail = ({ item }) => {
  return (
    <div>
      <div>{item.name}</div>
      <div>Price: {item.price}</div>
      <div>Happiness: {item.happiness}</div>
    </div>
  )
}

export default ItemDetail
