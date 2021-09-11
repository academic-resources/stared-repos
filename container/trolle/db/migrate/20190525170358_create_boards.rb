class CreateBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :boards do |t|
      t.string :title, null: false
      t.boolean :starred, default: false
      t.integer :user_id, null: false
      t.string :image, null: false
      t.string :visibility, default: "private"
      t.timestamps
    end
    add_index :boards, :title
    add_index :boards, :user_id
  end
end
