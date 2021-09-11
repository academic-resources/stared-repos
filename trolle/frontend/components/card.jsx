import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import EditCardDialog from './edit_card_dialog'

class Card extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editing: false
    }
    this.startEdit = this.startEdit.bind(this)
    this.close = this.close.bind(this)
  }

  startEdit() {
    this.setState({
      editing: true
    })
  }

  close() {
    this.setState({
      editing: false
    })
  }

  render() {
    const { card, index } = this.props
    const { editing } = this.state

    if (!card) return null

    if (!editing)
      return (
        <Draggable draggableId={card.id} index={index}>
          {(provided, snapshot) => {
            if (snapshot.isDragging) {
              return (
                <div
                  className="dragged-card"
                  data-title={card.title}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                  ref={provided.innerRef}
                >
                  {card.title}
                </div>
              )
            }
            return (
              <div
                className="card"
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                {card.title}
                <i className="fas fa-pencil-alt" onClick={this.startEdit} />
              </div>
            )
          }}
        </Draggable>
      )
    return <EditCardDialog card={card} close={this.close} />
  }
}

export default Card
