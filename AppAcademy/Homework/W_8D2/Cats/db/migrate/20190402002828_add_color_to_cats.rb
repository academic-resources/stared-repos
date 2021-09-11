class AddColorToCats < ActiveRecord::Migration[5.2]
  def change
    add_column :cats, :color, :string
  end
end
