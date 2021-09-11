export const getTeams = () =>
  $.ajax({
    method: 'GET',
    url: '/api/teams'
  })

export const createTeam = team =>
  $.ajax({
    method: 'POST',
    url: '/api/teams',
    data: { team }
  })
