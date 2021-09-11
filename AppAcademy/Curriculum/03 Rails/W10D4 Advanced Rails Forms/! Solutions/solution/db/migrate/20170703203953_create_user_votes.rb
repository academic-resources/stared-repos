class CreateUserVotes < ActiveRecord::Migration[5.1]
  def change
    create_table :user_votes do |t|
      t.integer :user_id, null: false
      t.integer :value, null: false
      t.integer :votable_id, null: false
      t.string :votable_type, null: false

      t.timestamps
    end
    add_index :user_votes, :user_id
    add_index :user_votes, [:votable_type, :votable_id]
    add_index :user_votes, [:user_id, :votable_type, :votable_id], unique: true
  end
end
