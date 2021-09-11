class Addteamindextoboards < ActiveRecord::Migration[5.2]
  def change
    add_index :boards, :team_id
  end
end
