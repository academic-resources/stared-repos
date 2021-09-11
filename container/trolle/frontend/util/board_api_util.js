export const createBoard = board =>
  $.ajax({
    method: 'POST',
    url: '/api/boards',
    data: { board }
  })

export const starBoard = id =>
  $.ajax({
    method: 'POST',
    url: `/api/boards/${id}/star`
  })

export const unStarBoard = id =>
  $.ajax({
    method: 'POST',
    url: `/api/boards/${id}/unstar`
  })

export const getBoards = () =>
  $.ajax({
    method: 'GET',
    url: '/api/boards'
  })

export const getMembers = id =>
  $.ajax({
    method: 'GET',
    url: `/api/boards/${id}/members`
  })

export const getBoard = id =>
  $.ajax({
    method: 'GET',
    url: `/api/boards/${id}`
  })

export const addBoardToRecent = id =>
  $.ajax({
    method: 'POST',
    url: `/api/boards/${id}/add_recent`
  })

export const updateBoard = board =>
  $.ajax({
    method: 'PATCH',
    url: `/api/boards/${board.id}`,
    data: { board }
  })

export const getMatchingUsers = (matching_string, board_id) =>
  $.ajax({
    method: 'GET',
    url: `/api/boards/${board_id}/matching`,
    data: { matching_string }
  })

export const inviteUsers = (user_ids, board_id) =>
  $.ajax({
    method: 'POST',
    url: `/api/boards/${board_id}/share`,
    data: { user_ids }
  })
