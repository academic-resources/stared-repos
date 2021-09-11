# @guests
# json.array! @guests do |guest|
#   json.name guest.name
#   json.age guest.age
#   json.favorite_color guest.favorite_color
#   json.id guest.id
# end

# json.guests do
#   @guests.map do |guest|
#     json.partial! 'guest', guest: guest
#   end
# end

json.array! @guests, partial: 'api/guests/guest', as: :guest
