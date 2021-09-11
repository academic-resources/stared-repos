import { fetchQuestions } from '../utils/api'
import { getQuestions, isLoading, loadError } from './questions'


export function handleInitialData() {
  return (dispatch) => {
    return fetchQuestions()
      .then(questions => {
        dispatch(isLoading(true))
        dispatch(getQuestions(questions))
        dispatch(isLoading(false))
      })
      .catch(error => {
        dispatch(loadError(error))
        dispatch(isLoading(false))
      })
  }
}


