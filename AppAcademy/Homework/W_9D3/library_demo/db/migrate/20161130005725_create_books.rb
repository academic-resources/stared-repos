class CreateBooks < ActiveRecord::Migration
  def change
    create_table :books do |t|
      t.string :title, null: false
      t.string :author, null: false
      t.integer :year
      t.string :category
      t.text :description

      t.timestamps null: false
    end
  end
end
