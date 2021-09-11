import {
  GET_QUESTIONS,
  LOADING,
  ERROR,
  NEXT_QUESTION,
  UPDATE_QUESTION,
  FINISH,
  RESET,
  START,
} from "../actions/questions";

import { initialAppState } from "../index"

export function questionsReducer(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return { ...state, questions: action.questions };
    case UPDATE_QUESTION:
      return {
        ...state,
        questions: [
          ...state.questions.map(q =>
            q.question === action.question.question ? action.question : q
          )
        ]
      };
    case LOADING:
      return { ...state, loading: action.loading };
    case ERROR:
      return { ...state, error: action.message };
    case NEXT_QUESTION:
      return { ...state, index: action.index + 1 };
    case FINISH:
      return {...state, completed: true}
    case START:
      return {...state, intro: false}
    case RESET:
      return initialAppState
    default:
      return state;
  }
}

// export function loading(state = true, action) {
//   switch(action.type) {
//     case LOAD_QUESTIONS:
//       return action.isLoading
//     default:
//       return state
//   }
// }

// export function error(state = null, action ){
//   switch(action.type) {
//     case ERROR:
//       return action.message
//     default:
//       return state
//   }
// }

// export function index(state = 0, action){
//   switch(action.type) {
//     case NEXT_QUESTION:
//       return action.index + 1
//     default:
//       return state
//   }
// }
