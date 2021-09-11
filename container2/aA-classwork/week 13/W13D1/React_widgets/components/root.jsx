import React from 'react';
import Clock from './clock';
import Tabs from './tabs';
import Weather from './weather';

const array = [
  { title: "One", content: "This is the first" },
  { title: "Two", content: "This is the second" },
  { title: "Three", content: "This is the third" }
];

const Root = () => {
  return (
    <div>
      <Clock />
      <Tabs tabs={array} />
      <Weather />
    </div>
  )
}

export default Root;