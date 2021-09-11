import gql from 'graphql-tag';

const Queries = {
  
  FETCH_PRODUCTS: gql`
    {
      products {
        _id
        name
        description
        weight
        cost
      }
    }
  `,
  FETCH_PRODUCT: gql`
    query fetchProduct($id: ID) {
      product(_id: $id) {
        _id
        name
        description
        weight
        cost
      }
    }
  `,
  IS_LOGGED_IN: gql`
    query IsUserLoggedIn {
      isLoggedIn @client
    }
  `,
  FETCH_CART_ITEMS: gql`
    query FetchCartItems {
      cart @client
    }
  `
}

export default Queries