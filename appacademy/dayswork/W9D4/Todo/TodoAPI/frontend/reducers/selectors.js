export const allTodos = state => {
  const keys = Object.keys(state.todos)
  return keys.map(k => state.todos[k])
}

export const allSteps = state => {
  const keys = Object.keys(state.steps)
  return keys.map(k => state.steps[k])
}

export const stepsByTodoId = (state, todoId) => {
  return allSteps(state).filter(step => step.todo_id === todoId)
}

export const allErrors = state => state.errors
