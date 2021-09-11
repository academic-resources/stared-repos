class UpdateTagLabelIndex < ActiveRecord::Migration[5.1]
  def change
    remove_index :tags, name: "index_tags_on_label"
  end
end
