class CreateShares < ActiveRecord::Migration[5.2]
  def change
    create_table :shares do |t|
      t.integer :board_id
      t.references :shareable, polymorphic: true, index: true

      t.timestamps
    end
    add_index :shares, [:board_id, :shareable_type], unique: true
  end
end
