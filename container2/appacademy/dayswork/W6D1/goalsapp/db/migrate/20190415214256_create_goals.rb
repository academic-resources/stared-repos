class CreateGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :goals do |t|
      t.string :title, null: false
      t.integer :user_id, null: false
      t.boolean :private, default: true
      t.boolean :completed, default: false

      t.timestamps
    end
    add_index :goals, :user_id
    add_index :goals, :private
    add_index :goals, :completed
    add_index :goals, [:user_id, :title], unique: true
  end
end
