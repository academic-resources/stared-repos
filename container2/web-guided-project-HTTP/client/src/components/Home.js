import React from 'react';

function Home(props) {
  const routeToShop = event => {
    event.preventDefault();
    props.history.push('/item-list');
  };

  return (
    <div className="home-wrapper">
      <img
        className="home-image"
        src="https://www.uncommongoods.com/images/category/fun-fullwidth.jpg"
        alt=""
      />
      <button onClick={routeToShop} className="md-button shop-button">
        Shop now!
      </button>
    </div>
  );
}

export default Home;