class MakeHouseTable < ActiveRecord::Migration[5.2]
  def change
    create_table :houses do |t|
      t.string :type, null: false
      t.timestamps
    end
  end
end
