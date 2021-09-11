class CreateComments < ActiveRecord::Migration[5.1]
  def change
    create_table :comments do |t|
      t.string :body, null: false
      t.integer :author_id, null: false
      t.integer :commentable_id, null: false
      t.string :commentable_type, null: false

      t.timestamps
    end
    add_index :comments, :author_id
    add_index :comments, :commentable_id
  end
end
