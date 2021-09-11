import * as ApiUtils from '../util/team_api_util'

export const RECEIVE_TEAMS = 'RECEIVE_TEAMS'
export const RECEIVE_TEAM = 'RECEIVE_TEAM'

export const getTeams = () => (dispatch, getState) =>
  ApiUtils.getTeams().then(teams =>
    dispatch({
      type: RECEIVE_TEAMS,
      teams
    })
  )

export const createTeam = team => (dispatch, getState) =>
  ApiUtils.createTeam(team).then(team => {
    dispatch({
      type: RECEIVE_TEAM,
      team
    })
    return team
  })
