class MakeCatIndex < ActiveRecord::Migration[5.2]
  def change
    add_index :cats, :name
  end
end
