import Card from './card'
import React from 'react'

const handleAdd = (id, cards, setCards) => {
  const result = window.prompt('Please enter text for the new card')

  const newId = cards.sort((a, b) => a.id - b.id)[cards.length - 1]['id'] + 1

  const newCard = {
    id: newId,
    column_id: id,
    body: result
  }

  setCards([...cards, newCard])
}

const Column = props => {
  const { id, name, color, cards, setCards } = props

  const mright = id === 4 ? '25px' : 0

  const cardsForCol = cards.filter(c => c.column_id === id)

  return (
    <div
      style={{
        flex: 1,
        marginLeft: '25px',
        marginRight: mright
      }}
    >
      <div
        style={{
          backgroundColor: color,
          color: 'white',
          height: 30,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {name}
      </div>
      <div>
        {cardsForCol.map(c => (
          <Card key={c.id} card={c} />
        ))}
      </div>
      <div onClick={() => handleAdd(id, cards, setCards)}>+ Add A Card</div>
    </div>
  )
}

export default Column
