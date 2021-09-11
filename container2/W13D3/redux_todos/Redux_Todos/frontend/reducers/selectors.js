
const allTodos = (state) => {
  const todos = Object.keys(state.todos).map(id => {
    return state.todos[id];
  });
  return todos;
};

export default allTodos;