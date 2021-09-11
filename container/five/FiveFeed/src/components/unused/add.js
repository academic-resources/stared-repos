import React from 'react'

import './people.css'

export default class Add extends React.Component {
  constructor() {
    super()

    this.onClick = this.onClick.bind(this)
  }

  onClick() {
    this.props.bringModal()
  }

  render() {
    return (
      <div
        style={{
          display: 'inline-block',
        }}
      >
        <img
          src="https://cdn3.iconfinder.com/data/icons/line/36/add-512.png"
          width="128"
          alt=""
          onClick={this.onClick}
        />
      </div>
    )
  }
}
