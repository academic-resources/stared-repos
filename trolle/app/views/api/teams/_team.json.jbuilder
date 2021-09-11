json.extract! team, :id, :title, :description
json.boards team.boards.map { |b| b.id }
json.num_members team.members.length
