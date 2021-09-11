export const recentBoards = state => {
  const boards = Object.values(state.entities.boards)
  const recent_ids = state.entities.users[state.session.id].recent_boards
  const starred_ids = state.entities.users[state.session.id].starred_boards
  return boards.filter(
    b => recent_ids.indexOf(b.id) >= 0 && starred_ids.indexOf(b.id) === -1
  )
}

export const starredBoards = state => {
  const boards = Object.values(state.entities.boards)
  const starred_ids = state.entities.users[state.session.id].starred_boards
  return boards.filter(b => starred_ids.indexOf(b.id) >= 0)
}

export const personalBoards = state => {
  const boards = Object.values(state.entities.boards)
  return boards.filter(b => b.personal)
}
