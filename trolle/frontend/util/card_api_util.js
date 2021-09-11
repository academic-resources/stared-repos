export const createCard = (card, list) =>
  $.ajax({
    method: 'POST',
    url: `/api/lists/${list.id}/cards`,
    data: { card }
  })

export const moveCard = data =>
  $.ajax({
    method: 'POST',
    url: `/api/cards/${data.card_id}/move`,
    data: { data }
  })

export const updateCard = card =>
  $.ajax({
    method: 'PATCH',
    url: `/api/cards/${card.id}`,
    data: { card }
  })
