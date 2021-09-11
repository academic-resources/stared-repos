
import App from 'next/app'
import Layout from '../components/layout.js'
import contextCart from '../components/contextCart';

export default class MyApp extends App {

  state = {
    cart: []
  }

  componentDidMount = () => {
    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      this.setState({
        cart
      });
    }
  };

  addToCart = (product) => {
    this.setState({
      cart: [...this.state.cart, product]
    });
    localStorage.setItem('cart', JSON.stringify(this.state.cart));
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <contextCart.Provider value={{ cart: this.state.cart, addToCart: this.addToCart }}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </contextCart.Provider>
    )
  }
}