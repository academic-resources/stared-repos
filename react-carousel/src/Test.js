import React from 'react'
import Karousel from './Karousel'

// import ImageOne from './assets/1.jpeg'
// import ImageTwo from './assets/2.jpeg'
// import ImageThree from './assets/3.jpeg'
import ImageFour from './assets/4.jpeg'
import ImageFive from './assets/5.jpeg'
import ImageSix from './assets/6.jpeg'
import ImageSeven from './assets/7.jpeg'

export default () => (
  <Karousel width="500px" autoPlay infiniteLoop={true} showStatus={false} showIndicators={false} dynamicHeight>
    <div className="testing">
      <p>Testing</p>
      <img alt="4" src={ImageFour} />
    </div>
    <div className="testing">
      <p>Testing</p>
      <img alt="5" src={ImageFive} />
    </div>
    <div className="testing">
      <p>Testing</p>
      <img alt="6" src={ImageSix} />
    </div>
    <div className="testing">
      <p>Testing</p>
      <img alt="7" src={ImageSeven} />
    </div>
  </Karousel>
)
