class DropTagging < ActiveRecord::Migration[5.1]
  def change

    drop_table :taggings
  end
end
