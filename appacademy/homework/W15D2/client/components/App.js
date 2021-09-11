import React from 'react'
import { Route } from 'react-router-dom'
import DogIndex from './dogs/DogIndex'
import ToyIndex from './toys/ToyIndex';
import DogDetail from './dogs/DogDetail';

const App = () => (
  <div>
    <Route exact path="/dogs/:dogId" component={DogDetail} />
    <Route exact path="/toys" component={ToyIndex} />
    <Route path="/" component={DogIndex} />
  </div>
)

export default App
