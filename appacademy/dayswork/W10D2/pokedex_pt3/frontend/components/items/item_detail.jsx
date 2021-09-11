import React from 'react'

const ItemDetail = ({ item }) => {
  return (
    <div>
      <div>
        <p>Name</p>
        <span>{item.name}</span>
      </div>
      <div>
        <p>Happiness</p>
        <span>{item.happiness}</span>
      </div>
      <div>
        <p>Price</p>
        <span>{item.price}</span>
      </div>
      <div>
        <p>Image</p>
        <img src={item.image_url} />
      </div>
    </div>
  )
}

export default ItemDetail
