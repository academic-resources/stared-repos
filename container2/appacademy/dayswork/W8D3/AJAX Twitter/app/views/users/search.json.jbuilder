json.array!(@users) do |user|
  json.(user, :username, :id)
  json.followed(current_user.follows?(user))
end
