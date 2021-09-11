class CreateJoinTableNoteTag < ActiveRecord::Migration[5.1]
  def change
    create_join_table :notes, :tags, table_name: :taggings do |t|
      t.integer :tag_id, null: false
      t.integer :note_id, null: false

      t.index [:note_id, :tag_id], unique: true
      t.index [:tag_id, :note_id], unique: true
    end
  end
end
