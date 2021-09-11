

export const allTodos = (state) => {
  const todoIds = Object.keys(state.todos)
  //iterate through todoid, match id to state.todos[id]
  return todoIds.map(id => state.todos[id])
}

// export default allTodos