json.partial! 'guest', guest: @guest
json.gifts do 
  @guest.gifts.each do |gift|
    json.set! gift.id do
      json.title gift.title
      json.description gift.description
    end
  end
end
