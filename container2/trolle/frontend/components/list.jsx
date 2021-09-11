import React from 'react'
import CardAdder from './card_adder'
import { connect } from 'react-redux'
import Card from './card'
import { createCard } from '../actions/card_actions'
import { updateList } from '../actions/list_actions'
import { getBoard } from '../actions/board_actions.js'
import { merge } from 'lodash'
import { Droppable } from 'react-beautiful-dnd'

const mstp = (state, ownProps) => ({
  cards: Object.values(state.entities.cards).filter(
    c => c.list_id === ownProps.list.id
  )
})

const mdtp = dispatch => ({
  createCard: (card, list) => dispatch(createCard(card, list)),
  updateList: list => dispatch(updateList(list)),
  getBoard: id => dispatch(getBoard(id))
})

class List extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      titleInputFocused: false,
      listTitle: this.props.list ? this.props.list.title : ''
    }
    this.handleTitleChange = this.handleTitleChange.bind(this)
  }

  componentDidMount() {
    const board_id = this.props.list.board_id
    this.props.getBoard(board_id)
  }

  handleTitleChange(e) {
    if (this.state.titleInputFocused)
      this.setState({
        listTitle: e.target.value
      })
  }

  toggleFocus(on) {
    if (on) {
      this.setState({
        titleInputFocused: true
      })
    } else {
      this.setState({
        titleInputFocused: false
      })
      const newList = merge({}, this.props.list)
      newList.title = this.state.listTitle
      this.props.updateList(newList)
    }
  }

  render() {
    const { list, cards, createCard } = this.props
    const { titleInputFocused, listTitle } = this.state
    const titleFocusStyle = titleInputFocused
      ? {
          background: 'white',
          color: '#172b4d',
          boxShadow: 'inset 0 0 0 2px #0079bf',
          outline: 'none',
          borderRadius: '3px',
          padding: '7px 6px',
          fontSize: '14px',
          fontWeight: 'bold',
          // fontFamily: 'Arial',
          alignSelf: 'stretch',
          marginLeft: '3px',
          marginTop: '3px',
          border: 'none',
          height: '19px'
        }
      : {
          background: 'transparent',
          color: '#172b4d',
          cursor: 'pointer',
          border: 'none',
          fontSize: '14px',
          fontWeight: 'bold',
          // fontFamily: 'Arial',
          padding: '10px'
        }

    const sortedCards = cards.sort((a, b) => a.order - b.order)
    return (
      <div className="list-frame">
        <input
          type="text"
          onFocus={() => this.toggleFocus(true)}
          onBlur={() => this.toggleFocus(false)}
          className="list-title-input"
          onChange={this.handleTitleChange}
          value={listTitle}
          // @ts-ignore
          style={titleFocusStyle}
          size={listTitle ? listTitle.length + 0 : 1}
        />
        <Droppable droppableId={list.id}>
          {provided => (
            // @ts-ignore
            <div
              className="cards-holder"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {sortedCards.map((c, index) => (
                <Card key={c.id} card={c} index={index} />
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <CardAdder
          first={list.length === 0}
          list={list}
          createCard={createCard}
        />
      </div>
    )
  }
}

export default connect(
  mstp,
  mdtp
)(List)
