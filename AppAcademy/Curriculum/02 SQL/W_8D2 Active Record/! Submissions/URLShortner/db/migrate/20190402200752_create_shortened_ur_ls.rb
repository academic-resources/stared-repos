class CreateShortenedUrLs < ActiveRecord::Migration[5.2]
  def change
    create_table :shortened_urls do |t|
      t.string :long_url, null: false, unique: true
      t.string :short_url, null: false
      t.integer :submitted_id, null: false

      t.timestamps
    end
    add_index :shortened_urls, :short_url
  end
end
