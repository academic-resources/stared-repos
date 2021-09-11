import Products from '../components/Products.js'
import fetch from 'isomorphic-unfetch'
const Index = ({products}) => (
  <div>
    <Products products={products} />
  </div>
  
)

Index.getInitialProps = async function () {
  const url = "https://8dbbc77b-api.agilitycms.cloud/fetch/en-us/list/productlist";
  const key = "defaultlive.c9cdfc30fbfa87f64dc637b174f66a59d2db17d241fa4213751e7b08cd3c7fb7"
  const res = await fetch(url, {
    headers: {
      "APIKey": key
    }
  })
  const data = await res.json()
  const productData = data.items
   return {
     products: productData
  };
};
export default Index