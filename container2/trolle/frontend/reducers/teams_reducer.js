import { merge } from 'lodash'

import { RECEIVE_TEAMS, RECEIVE_TEAM } from '../actions/team_actions'

const teamsReducer = (state = {}, action) => {
  const draft = merge({}, state)

  switch (action.type) {
    case RECEIVE_TEAMS:
      return action.teams

    case RECEIVE_TEAM:
      draft[action.team.id] = action.team
      return draft

    default:
      return state
  }
}

export default teamsReducer
