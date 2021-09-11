import React from 'react';
import { Link } from 'react-router-dom'
import { Query } from 'react-apollo';
import Queries from '../../graphql/queries'
import AddToCart from '../cart/AddToCart'
const { FETCH_PRODUCT } = Queries

const ProductDetail = props => {
  return (
    <Query
      query={ FETCH_PRODUCT }
      variables={ { id: props.match.params.productId } }
    >
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${ error.message }`;
        const { _id, name, description, weight, cost } = data.product

        const productWeight = weight ? <p>weight: { weight } lbs.</p> : null
        return (
          <div>
            <h1>{ name }</h1>
            <p>{ description }</p>
            { productWeight }
            <AddToCart _id={_id} cost={cost} />
          </div>
        );
      }}
    </Query>
  )
}

export default ProductDetail