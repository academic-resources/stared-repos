class CreateAlbums < ActiveRecord::Migration[5.2]
  def change
    create_table :albums do |t|
      t.integer :band_id, null: false
      t.string :title, null: false
      t.integer :year, null: false
      t.boolean :live, default: false, null: false
    end
    add_index :albums, :band_id
    add_index :albums, :title
    add_index :albums, :year
  end
end
