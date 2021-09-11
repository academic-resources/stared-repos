class CreateAlbums < ActiveRecord::Migration[5.1]
  def change
    create_table :albums do |t|
      t.string :name, null: false
      t.integer :band_id, null: false
      t.integer :year, null: false
      t.boolean :live, null: false, default: false

      t.timestamps
    end

    ##
    # We can use the following index to search by
    # both :band_id and [:band_id, :name] (order matters!)
    # https://stackoverflow.com/questions/6169996/index-on-multiple-columns-in-ror#6170023
    ##
    add_index :albums, %i(band_id name), unique: true
  end
end
