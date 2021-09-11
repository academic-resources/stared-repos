export const fetchTodos = () => {
    // $.ajax({
    //     method:'GET',
    //     url:'/api/todos' 
    // }).then(
    //     todos => console.log(todos), 
    //     error => console.log(error)
    // );
    return $.ajax({
        method:'GET',
        url:'/api/todos' 
    })
}

export const createTodo = todo => {
  return $.ajax({
    method: 'POST',
    url: '/api/todos',
    data: todo
  })
}