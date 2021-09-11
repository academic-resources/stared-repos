class FixHouseId < ActiveRecord::Migration[5.2]
  def change
    add_column :cats, :house_id, :integer, null: false
  end
end
