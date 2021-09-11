import { Query } from 'react-apollo'
import React from 'react'
import { FETCH_PRODUCT } from '../../graphql/queries'

const ProductDetail = (props) => {
    return (
        <Query query={FETCH_PRODUCT}
          variables={
            {id: props.match.params.product_id}
          }
        >
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;
                const { product } = data
                return (
                  <div>
                    <p>{product.name}</p>
                    <p>{product.description}</p>
                    <p>{product.weight}</p>
                  </div>
                // <ul>
                //     {data.products.map(product => (
                //    <Link to={`/products/${product._id}`} key={product._id}>
                //         <li >{product.name}</li>
                //    </Link> 
                //     ))}
                // </ul>
                );
            }}
    </Query>
    )
}

export default ProductDetail