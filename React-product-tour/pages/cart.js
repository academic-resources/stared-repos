
import { useContext } from 'react';
import contextCart from '../components/contextCart';

const Cart = () => {
  const { cart } = useContext(contextCart);
  return (
    <div>
      <div className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 p-5 bg-white rounded shadow-sm mb-5">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col" className="border-0 bg-light">
                        <div className="p-2 px-3 text-uppercase">Product</div>
                      </th>
                      <th scope="col" className="border-0 bg-light">
                        <div className="py-2 text-uppercase">Price</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map(item =>
                      <tr>
                        <th scope="row" className="border-0">
                          <div className="p-2">
                            <img src={item.fields.image.url} alt="product" width="70" className="img-fluid rounded shadow-sm" />
                            <div className="ml-3 d-inline-block align-middle">
                              <h5 className="mb-0"> <a href="#" className="text-dark d-inline-block align-middle">{item.fields.description}</a></h5>
                            </div>
                          </div>
                        </th>
                        <td className="border-0 align-middle"><strong>$ {item.fields.price}</strong></td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <a href="#" className="btn btn-dark rounded-pill py-2 btn-block">Procceed to checkout</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Cart;