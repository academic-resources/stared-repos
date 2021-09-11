import React from 'react';
import ReactDOM from 'react-dom';

import Clock from './clock';
import Weather from './weather';
import Tabs from './tabs';
import AutoComplete from './autocomplete';

function Root() {
  return(
    <div className='widgets-container'>
      <Clock />
      <Weather />
      <div className='row'>
        <Tabs tabs={tabs}/>
        <AutoComplete names={names}/>
      </div>
    </div>
  )
}

const tabs = [{ title: 'one', content: 'I am the first' }, { title: 'two', content: 'second pane here' }, { title: 'three', content: 'third pane here' }];
const names = ['Bryce', 'Conley', 'David', 'Gordy', 'Jasmine', 'JM', 'Lisa', 'Mashu', 'Oliver', 'Rich', 'Soon-Mi', 'Brian', 'Bruce', 'Ben', 'Barry', 'Bill', 'Bryan', 'Brice', 'Brynn', 'Brittany', 'Brittney', 'Britney'];

document.addEventListener("DOMContentLoaded", () => {
  const root = document.getElementById("root");
  ReactDOM.render(<Root />, root);
});
