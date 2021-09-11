class UpdateCatsHouseIdToBeNil < ActiveRecord::Migration[5.2]
  def change
    change_column :cats, :house_id, :integer
  end
end
