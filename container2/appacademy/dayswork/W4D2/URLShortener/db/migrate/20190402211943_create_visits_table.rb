class CreateVisitsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :visits do |t|
      t.integer :short_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :visits, :short_id
    add_index :visits, :user_id
  end
end
