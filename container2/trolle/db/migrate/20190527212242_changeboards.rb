class Changeboards < ActiveRecord::Migration[5.2]
  def change
    remove_column :boards, :starred, :boolean
    add_column :boards, :team_id, :integer
    add_column :boards, :personal, :boolean, default: true
  end
end
