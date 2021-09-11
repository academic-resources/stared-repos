class CreateQuestion < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :text, null: false
      t.timestamps
    end
    add_index :questions, :text
  end
end
