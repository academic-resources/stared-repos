class CreateNotes < ActiveRecord::Migration[5.1]
  def change
    create_table :notes do |t|
      t.integer :track_id, null: false
      t.integer :user_id, null: false
      t.text :content, null: false

      t.timestamps
    end

    add_index :notes, :track_id
    add_index :notes, :user_id
  end
end
