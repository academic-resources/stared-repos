class CreateLikes < ActiveRecord::Migration[5.1]
  def change
    create_table :likes do |t|
      t.integer :user_id
      t.references :likeable, polymorphic: true, index: true

      t.timestamps
    end

    add_index :likes, [:user_id, :likeable_type], unique: true
  end
end
