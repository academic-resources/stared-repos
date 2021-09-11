import React, { useState } from 'react'

import Column from './column'

const Board = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      column_id: 1,
      body: 'card 1'
    },
    {
      id: 2,
      column_id: 1,
      body: 'card 2'
    },
    {
      id: 3,
      column_id: 2,
      body: 'card 3'
    },
    {
      id: 4,
      column_id: 2,
      body: 'card 4'
    },
    {
      id: 5,
      column_id: 3,
      body: 'card 5'
    },
    {
      id: 6,
      column_id: 3,
      body: 'card 6'
    },
    {
      id: 7,
      column_id: 4,
      body: 'card 7'
    },
    {
      id: 8,
      column_id: 4,
      body: 'card 8'
    }
  ])

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '100%',
        margin: '10rem'
      }}
    >
      <Column
        id={1}
        name={'col-1'}
        color={'#8e6e95'}
        cards={cards}
        setCards={setCards}
      />
      <Column
        id={2}
        name={'col-2'}
        color={'#39a59c'}
        cards={cards}
        setCards={setCards}
      />
      <Column
        id={3}
        name={'col-3'}
        color={'#344759'}
        cards={cards}
        setCards={setCards}
      />
      <Column
        id={4}
        name={'col-4'}
        color={'#e8741e'}
        cards={cards}
        setCards={setCards}
      />
    </div>
  )
}

export default Board
