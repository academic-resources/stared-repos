# frozen_string_literal: true

class CreateArtworkShare < ActiveRecord::Migration[5.2]
  def change
    create_table :artwork_shares do |t|
      t.integer :artwork_id, null: false
      t.integer :viewer_id, null: false
      t.timestamps
    end
    add_index :artwork_shares, %i[artwork_id viewer_id], unique: true
    add_index :artwork_shares, :artwork_id
    add_index :artwork_shares, :viewer_id
  end
end
