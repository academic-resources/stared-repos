import React from 'react'

const Card = props => {
  const { card } = props

  return <div> {card.body}</div>
}

export default Card
