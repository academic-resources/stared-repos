json.partial! "api/guests/guest", guest: @guest

json.gifts @guest.gifts.each do | gift |
  json.title gift.title
  json.description gift.description
end
