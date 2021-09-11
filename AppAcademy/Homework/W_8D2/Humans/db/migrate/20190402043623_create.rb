class Create < ActiveRecord::Migration[5.2]
  def change
    create_table :house do |t|
      t.string :address, null: false
    end
  end
end
