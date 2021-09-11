class AddPollForeignKey < ActiveRecord::Migration[5.2]
  def change
    add_column :polls, :author_id, :integer
    add_index :polls, [:author_id, :title]
  end
end
