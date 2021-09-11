export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const RECEIVE_TODO = 'RECEIVE_TODO';

export const receiveTodos = todos => { 
    return {
        type: RECEIVE_TODOS,
        todos
    }//: todos //{ todos: [todo1, todo2, todo3]}
}

export const receiveTodo = todo => {
    return {
        type: RECEIVE_TODO,
        todo
    }    
}