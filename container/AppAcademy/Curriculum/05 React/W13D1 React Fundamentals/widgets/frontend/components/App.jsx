import React from 'react'
import Clock from './clock'
import Tabs from './tabs'
import Weather from './weather'
import AutoComplete from './autocomplete'

const tabs = [
  {
    title: 'one',
    content: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam quibusdam laudantium quos dolor ipsa, voluptatum natus at consectetur temporibus itaque sint fugit sed, laborum quas harum autem accusamus quaerat sunt!'
  },
  {
    title: 'two',
    content: 'Aliquam quibusdam laudantium quos dolor ipsa, voluptatum natus at consectetur temporibus itaque sint fugit sed, laborum quas harum autem accusamus quaerat sunt!'
  },
  {
    title: 'three',
    content:  'consectetur adipisicing elit. Aliquam quibusdam laudantium quos dolor ipsa, voluptatum natus at consectetur temporibus itaque sint fugit sed, laborum quas harum autem accusamus quaerat sunt!'
  },
]

const names = [
  'mashu',
  'rich',
  'oliver',
  'conley',
  'bryce',
  'lisa',
  'jasmine',
  'john-michael',
  'david',
  'gordy'
]

const App = () => {
  return (
    <div>
      <Clock />
      <Weather />
      <Tabs tabs={tabs} />
      <AutoComplete names={names}/>
    </div>
  )
}

export default App