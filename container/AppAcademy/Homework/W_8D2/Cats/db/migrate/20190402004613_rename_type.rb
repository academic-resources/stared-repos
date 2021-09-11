class RenameType < ActiveRecord::Migration[5.2]
  def self.up
    rename_column :houses, :type, :house_type
  end

  # def self.down
  # end
end
