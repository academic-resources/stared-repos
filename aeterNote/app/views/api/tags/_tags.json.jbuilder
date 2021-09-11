tags.each do |tag|
  json.set! tag.id do
    json.extract! tag, :id, :label, :user_id
  end
end
