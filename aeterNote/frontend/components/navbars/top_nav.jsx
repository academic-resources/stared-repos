import React from 'react';
import SessionLinks from '../session/session_links';

const TopNav = () => {
  return(
    <div className='top-nav'>
      <div className='nav-elements'>
        <div className='logo'>
          <img  src={window.staticImages.logoMain} />
          <h3 >ÆTERNOTE</h3>
        </div>
        <SessionLinks/>
      </div>
    </div>
  );
};

export default TopNav;
