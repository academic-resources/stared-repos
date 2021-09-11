json.array! @parties do |party|
  json.name party.name
  json.location party.location
  json.set! :guests do 
    party.guests.each do |guest|
      json.name guest.name
    end
  end
end