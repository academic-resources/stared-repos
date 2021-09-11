import React from 'react';
import GodsList from './gods/GodsList';
// import GodCreate from './create/GodCreate';
// import EmblemCreate from './create/EmblemCreate';
// import AbodeCreate from './create/AbodeCreate';
import CreateIndex from './create/CreateIndex';
import { Route } from 'react-router-dom';

const App = () => {
  return (
    <div>
      <Route exact path='/' component={GodsList} />
      <Route path='/new' component={CreateIndex} />
      {/* <Route path='/newgod' component={GodCreate} />
      <Route path='/newemblem' component={EmblemCreate} />
      <Route path='/newabode' component={AbodeCreate} /> */}
    </div>
  );
};

export default App;
