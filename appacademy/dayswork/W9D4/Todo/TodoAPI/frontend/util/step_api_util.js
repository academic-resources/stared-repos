export const fetchSteps = (todo_id) => {
  return $.ajax({
    method: 'GET',
    url: `/api/todos/${todo_id}/steps`
  })
}

export const createStep = (step) => {
  return $.ajax({
    method: 'POST',
    url: `/api/todos/${step.todo_id}/steps`,
    data: { step }
  })
}

export const updateStep = step => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/steps/${step.id}`,
    data: { step }
  })
}

export const removeStep = step => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/steps/${step.id}`,
    data: { step }
  })
}
