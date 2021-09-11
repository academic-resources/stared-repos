import { Query } from 'react-apollo'
import React from 'react'
import { FETCH_PRODUCTS } from '../../graphql/queries'

import { Link } from 'react-router-dom'

const ProductIndex = () => {
    return (
        <Query query={FETCH_PRODUCTS}>
            {({ loading, error, data }) => {
                if (loading) return "Loading...";
                if (error) return `Error! ${error.message}`;

                return (
                <ul>
                    {data.products.map(product => (
                   <Link to={`/products/${product._id}`} key={product._id}>
                        <li >{product.name}</li>
                   </Link> 
                    ))}
                </ul>
                );
            }}
    </Query>
    )
}

export default ProductIndex