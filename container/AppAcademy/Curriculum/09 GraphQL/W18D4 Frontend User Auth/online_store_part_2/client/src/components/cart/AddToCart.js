import React from 'react'
import { Query, ApolloConsumer, Mutation } from 'react-apollo'
import Queries from '../../graphql/queries'
import Mutations from '../../graphql/mutations'

const { FETCH_CART_ITEMS } = Queries

const AddToCart = ({_id, cost}) => {
  return (
    <Query query={ FETCH_CART_ITEMS }>
      {({ loading, error, data }) => {
        if (loading) return "Loading...";
        if (error) return `Error! ${ error.message }`;
        
        const cartItemIds = data.cart.map(item => item.id)
        let newCart
        if (data.cart.length === 0 || !cartItemIds.includes(_id)) {
          return (
            <button
              onClick={ () => {
                const newItem = {_id, cost};
                // clientCache.writeData({ data: { cart: [newItem, ...data.cart] } })
                
                // clientCache.writeQuery({
                //   query: FETCH_CART_ITEMS,
                //   data: { cart: [newItem, ...data.cart]}
                // })
              }}
            >
              Add to Cart
            </button>
          )
        } else {
          return (
            <button
              onClick= { () => {
                newCart = []
                data.cart.forEach(item => {
                  if (item._id !== _id) newCart.push(item)
                });
                // clientCache.writeData({ data: { cart: newCart } })
              }}
            >
              Remove from Cart
            </button>
          )
        }
      }}
    </Query>
  )
}

export default AddToCart