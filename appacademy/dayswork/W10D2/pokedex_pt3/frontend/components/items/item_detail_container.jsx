import React from 'react'
import { connect } from 'react-redux'
import { selectPokemonItem } from '../../reducers/selectors'
import ItemDetail from './item_detail'

const mstp = (state, ownProps) => {
  const itemId = ownProps.match.params.itemId
  return {
    item: selectPokemonItem(state, itemId)
  }
}

export default connect(
  mstp,
  null
)(ItemDetail)
