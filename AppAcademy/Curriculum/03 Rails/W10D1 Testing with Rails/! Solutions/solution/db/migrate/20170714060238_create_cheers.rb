class CreateCheers < ActiveRecord::Migration[5.1]
  def change
    create_table :cheers do |t|
      t.integer :giver_id, null: false
      t.integer :goal_id, null: false

      t.timestamps
    end
    add_index :cheers, :giver_id
    ##
    # This second index allows us to search for
    # both `goal_id` and `[:goal_id, :giver_id]`!!
    # (but not giver_id alone, order matters!)
    ##
    add_index :cheers, %i(goal_id giver_id), unique: true
  end
end
