class RenameHouseTable < ActiveRecord::Migration[5.2]
  def self.up
    rename_table :house, :houses
  end
end
