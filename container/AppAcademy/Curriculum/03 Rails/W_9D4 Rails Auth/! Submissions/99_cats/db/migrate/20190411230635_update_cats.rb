class UpdateCats < ActiveRecord::Migration[5.2]
  def change
    add_column :cats, :user_id, :integer
    add_index :cats, :user_id
  end
end
