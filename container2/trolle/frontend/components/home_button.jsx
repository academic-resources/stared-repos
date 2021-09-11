import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { setSelectedHomeMenuItem } from '../actions/ui_actions'

const mdtp = dispatch => ({
  setSelectedItem: selection => dispatch(setSelectedHomeMenuItem(selection))
})

export default connect(
  null,
  mdtp
)(
  withRouter(({ history, setSelectedItem }) => (
    <div
      className="home-btn-bg"
      onClick={() => {
        history.push('/boards')
        setSelectedItem('boards')
      }}
    >
      <div className="home-btn-icon" />
    </div>
  ))
)
