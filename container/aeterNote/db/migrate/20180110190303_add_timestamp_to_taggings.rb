class AddTimestampToTaggings < ActiveRecord::Migration[5.1]
  def change
    add_column :taggings, :created_at, :datetime
    add_column :taggings, :updated_at, :datetime
  end
end
