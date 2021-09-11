export const createList = (list, board) =>
  $.ajax({
    method: 'POST',
    url: `/api/boards/${board.id}/lists`,
    data: { list }
  })

export const updateList = list =>
  $.ajax({
    method: 'PATCH',
    url: `/api/lists/${list.id}`,
    data: { list }
  })
