class CreateTeams < ActiveRecord::Migration[5.2]
  def change
    create_table :teams do |t|
      t.string :title, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_index :teams, :user_id
  end
end
