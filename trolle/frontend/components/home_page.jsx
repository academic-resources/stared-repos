import React from 'react'
import HomeMenu from './home_menu'
import { Route } from 'react-router-dom'
import Boards from './boards'
import CreateBoardForm from './create_board_form'
import Board from './board'

export default ({ location }) => {
  if (location.pathname.match(/\/boards\/\d+/))
    return <Route path="/boards/:id" component={Board} />
  return (
    <div className="home-container">
      <HomeMenu />
      <div className="home-content">
        <Route path="/boards" component={Boards} />
        <Route path="/boards/new" component={CreateBoardForm} />
      </div>
    </div>
  )
}
