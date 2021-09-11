import { connect } from 'react-redux'
import ItemDetail from './item_detail'

const mstp = (state, ownProps) => {
  let itemId = ownProps.match.params.itemId
  return {
    item: state.entities.items[itemId]
  }
}

export default connect(mstp)(ItemDetail)