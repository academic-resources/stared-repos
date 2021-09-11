import React from 'react'
import Product from "./Product"

 const Products = ({products}) => {
   return (
     <div>
       <div className="container mt-4">
         <div className="row">
           {/* Map through the product props and return the item in the Product Component */}
           {products.map(item => <Product key={item.fields.id} product={item} />)}
         </div>
       </div>
     </div>
   )
}

export default Products