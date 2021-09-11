class CreateCollectionItems < ActiveRecord::Migration[5.2]
  def change
    create_table :collection_items do |t|
      t.integer :collection_id, null: false
      t.integer :artwork_id, null: false
      t.timestamps
    end

    add_index :collection_items, :artwork_id
    add_index :collection_items, [:collection_id, :artwork_id], unique: true
  end
end
