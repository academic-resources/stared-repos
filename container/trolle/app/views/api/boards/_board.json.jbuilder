json.extract! board, :id, :title, :user_id, :visibility, :team_id, :personal
json.image image_url("board_#{board.image}.jpg")
json.members board.members.map { |m| m.id }
json.lists board.lists.map { |l| l.id }
