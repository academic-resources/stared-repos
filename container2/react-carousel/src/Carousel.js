import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import ImageOne from './assets/1.jpeg'
import ImageTwo from './assets/2.jpeg'
import ImageThree from './assets/3.jpeg'
// import ImageFour from './assets/4.jpeg'
// import ImageFive from './assets/5.jpeg'
// import ImageSix from './assets/6.jpeg'
// import ImageSeven from './assets/7.jpeg'

export default () => (
  <Carousel showStatus={false} showIndicators={false} dynamicHeight>
    <div>
      <img alt="1" src={ImageOne} />
    </div>
    <div>
      <img alt="2" src={ImageTwo} />
    </div>
    <div>
      <img alt="3" src={ImageThree} />
    </div>
    {/* <div>
      <img alt="4" src={ImageFour} />
    </div>
    <div>
      <img alt="5" src={ImageFive} />
    </div>
    <div>
      <img alt="6" src={ImageSix} />
    </div>
    <div>
      <img alt="7" src={ImageSeven} />
    </div> */}
  </Carousel>
)
