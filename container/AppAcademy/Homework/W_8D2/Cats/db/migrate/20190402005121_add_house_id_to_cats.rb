class AddHouseIdToCats < ActiveRecord::Migration[5.2]
  def change
    add_column :house_id
  end
end
