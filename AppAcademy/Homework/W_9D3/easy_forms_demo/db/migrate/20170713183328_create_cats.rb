class CreateCats < ActiveRecord::Migration[5.1]
  def change
    create_table :cats do |t|
      t.string :name
      t.integer :age
      t.string :sex
      t.text :biography
      t.string :coat_color
      t.date :birth_date

      t.timestamps
    end
  end
end
