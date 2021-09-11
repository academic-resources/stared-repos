class CreateTags < ActiveRecord::Migration[5.1]
  def change
    create_table :tags do |t|
      t.string :label, null: false

      t.timestamps
    end

    add_index :tags, :label, unique: true
  end
end
