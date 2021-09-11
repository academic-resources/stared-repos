export const CHANGE_FILTER = 'CHANGE_FILTER'
import { fetchBenches } from './bench_action'

const changeFilter = (filter, value) => ({
  type: CHANGE_FILTER,
  filter,
  value
})

export const updateFilter = (filter, value) => (dispatch, getState) => {
  dispatch(changeFilter(filter, value))
  return fetchBenches(getState().ui.filters)(dispatch)
}
