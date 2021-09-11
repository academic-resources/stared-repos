class RemoveCatHouseId < ActiveRecord::Migration[5.2]
  def change
    remove_column :cats, :house_id
  end
end
