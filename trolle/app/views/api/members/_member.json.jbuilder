json.extract! member, :id, :username, :email, :name
json.recent_boards member.recently_viewed_boards.map { |b| b.id }
json.starred_boards member.starred_boards.map { |b| b.id }
