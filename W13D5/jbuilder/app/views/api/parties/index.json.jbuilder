json.array! @parties do |party|
    json.name party.name
    json.location party.location
    json.guests party.guests do |guest|
        json.partial! 'api/guests/guest', guest: guest
    end
end

