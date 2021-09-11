# frozen_string_literal: true

class FixUserTable < ActiveRecord::Migration[5.2]
  def change
    remove_column :users, :email
    rename_column :users, :name, :username
  end
end
