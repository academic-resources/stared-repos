class FixColumnName < ActiveRecord::Migration[5.2]
  def change
    rename_column :subs, :moderator, :moderator_id
  end
end
