class CreateHousesTable < ActiveRecord::Migration[5.2]
  def change
    create_table :houses do |t|
      t.string :address, null: false
    end
  end
end
