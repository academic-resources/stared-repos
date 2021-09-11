class AddPlainTextToNotes < ActiveRecord::Migration[5.1]
  def change
    add_column :notes, :plain_text, :string
  end
end
