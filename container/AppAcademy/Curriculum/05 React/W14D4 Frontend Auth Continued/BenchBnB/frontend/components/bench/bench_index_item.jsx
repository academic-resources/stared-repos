import React from 'react'

const BenchIndexItem = ({ bench }) => {
  return (
    <li>
      <h3>Description:</h3>
      <p>{ bench.description }</p>
    </li>
  )
}

export default BenchIndexItem