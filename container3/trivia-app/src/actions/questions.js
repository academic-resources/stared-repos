export const GET_QUESTIONS = 'GET_QUESTIONS';
export const LOADING = 'LOADING';
export const ERROR = 'ERROR';
export const NEXT_QUESTION = 'NEXT_QUESTION';
export const UPDATE_QUESTION = 'UPDATE_QUESTION';
export const FINISH = 'FINISH';
export const START = 'START';
export const RESET = 'RESET';

export function getQuestions(questions) {
  return {
    type : GET_QUESTIONS,
    questions
  }
}

export function isLoading(boolean) {
  return {
    type: LOADING,
    loading: boolean
  }
}

export function loadError(error) {
  return {
    type: ERROR,
    message: error
  }
}

export function updateQuestion(question) {
  return {
    type: UPDATE_QUESTION,
    question
  }
}

export function nextQuestion(index) {
  return  {
    type: NEXT_QUESTION,
    index
  }
}

export function finishQuestions() {
  return {
    type: FINISH,
  }
}

export function startQuestions() {
  return {
    type: START,
  }
}

export function reset() {
  return {
    type: RESET
  }
}

