json.tags do
  @tags.each do |tag|
    json.set! tag.id do
      json.extract! tag, :id, :label, :user_id, :note_ids
    end
  end
end

json.tag_message @tag_message
