class AddDescriptionToCats < ActiveRecord::Migration
  def change
    add_column :cats, :description, :text, null: false
  end
end
