class RemoveIndexInTaggings < ActiveRecord::Migration[5.1]
  def change
    remove_index :taggings, name: "index_taggings_on_note_id_and_tag_id"
  end
end
