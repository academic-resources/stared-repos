class RemovePasswordsFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :password
    add_column :users, :password_digest, :string
    change_column :users, :password_digest, :string, null: false
  end
end
