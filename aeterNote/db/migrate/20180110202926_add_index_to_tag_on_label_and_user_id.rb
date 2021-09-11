class AddIndexToTagOnLabelAndUserId < ActiveRecord::Migration[5.1]
  def change
    add_index :tags, [:user_id, :label], unique: true
  end
end
