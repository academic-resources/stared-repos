class AddDescriptionToTeam < ActiveRecord::Migration[5.2]
  def change
    add_column :teams, :description, :string
  end
end
