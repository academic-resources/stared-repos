class AddCounterToUsers < ActiveRecord::Migration
  def change
    add_column :users, :counter, :integer, default: 0
  end
end
