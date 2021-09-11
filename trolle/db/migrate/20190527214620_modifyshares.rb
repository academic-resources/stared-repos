class Modifyshares < ActiveRecord::Migration[5.2]
  def change
    remove_column :shares, :shareable_type, :string
    remove_column :shares, :shareable_id, :integer
    add_column :shares, :user_id, :integer
    add_index :shares, [:board_id, :user_id], unique: true
  end
end
