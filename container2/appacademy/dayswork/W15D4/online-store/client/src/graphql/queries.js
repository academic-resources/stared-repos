import gql from 'graphql-tag'

export const FETCH_PRODUCTS = gql`
{
  products {
    _id
    name
    description
  }
}
`;
export const FETCH_PRODUCT = gql`
  query fetchProduct($id: ID!)
  {
    product(_id: $id ) {
      weight
      name
      description
    }
  }
`;
//query Fetch(id: ID!)
export const IS_LOGGED_IN = gql`
    query IsUserLoggedIn {
        isLoggedIn @client
    }
`;

export const FETCH_CATEGORIES = gql`
{
  categories{
    _id
    name
  }
}
`;