class AddCoatColorToCats < ActiveRecord::Migration
  def change
    add_column :cats, :coat_color, :string, null: false
  end
end
