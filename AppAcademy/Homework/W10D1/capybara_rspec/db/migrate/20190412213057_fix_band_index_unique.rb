class FixBandIndexUnique < ActiveRecord::Migration[5.2]
  def change
    remove_index :bands, :name
    add_index :bands, :name, unique: true
  end
end
