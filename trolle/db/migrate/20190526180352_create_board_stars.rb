class CreateBoardStars < ActiveRecord::Migration[5.2]
  def change
    create_table :board_stars do |t|
      t.integer :user_id, null: false
      t.integer :board_id, null: false

      t.timestamps
    end

    add_index :board_stars, :user_id
    add_index :board_stars, :board_id
  end
end
