import * as APIUtil from '../util/todo_api_util'

export const RECEIVE_TODOS = 'RECEIVE_TODOS';
export const RECEIVE_TODO = 'RECEIVE_TODO';

import { receiveErrors } from './errors_action'

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

export const fetchTodos = () => {
    return dispatch => { 
        return APIUtil.fetchTodos().then(
            todos => { dispatch(receiveTodos(todos)) }
        )
    }
}

export const createTodo = todo => {
    return dispatch => { 
        return APIUtil.createTodo(todo).then(
            todo => { 
                dispatch(receiveTodo(todo))
                // dispatch(clearErrors())
            },
            err => {
                // console.log(err)
                dispatch(receiveErrors(err.responseJSON))
            }
        )
    }
}