class CreateCats < ActiveRecord::Migration
  def change
    create_table :cats do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
