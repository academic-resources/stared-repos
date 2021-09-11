class FixTables < ActiveRecord::Migration[5.2]
  def change
    add_column :answer_choices, :question_id, :integer
    remove_column :responses, :question_id
  end
end
