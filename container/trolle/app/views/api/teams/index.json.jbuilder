@teams.each do |team|
  json.set! team.id do
    json.partial! "api/teams/team", team: team
  end
end
