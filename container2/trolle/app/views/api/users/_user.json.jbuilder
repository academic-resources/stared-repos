json.extract! user, :id, :username, :email, :name
json.recent_boards user.recently_viewed_boards.map { |b| b.id }
json.starred_boards user.starred_boards.map { |b| b.id }
