class CreateLikes < ActiveRecord::Migration[5.2]
  def change
    create_table :likes do |t|
      t.references :likeable, polymorphic: true, index: true
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :likes, :user_id
    add_index :likes, [:likeable_id, :user_id, :likeable_type], unique: true
  end
end
