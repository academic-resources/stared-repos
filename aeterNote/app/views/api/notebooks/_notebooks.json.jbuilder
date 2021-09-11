notebooks.each do |notebook|
  json.set! notebook.id do
    json.extract! notebook, :id, :title, :note_ids
  end
end
