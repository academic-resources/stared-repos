class CreateCatsTable < ActiveRecord::Migration[5.2]
  def change
    create_table :cats do |t|
      t.string :name, null: false
      t.timestamps
    end
    # what it's doing:
    #   self.create_table(:cats) do |table|
    #   end
  end
end
