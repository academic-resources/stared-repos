class CreateAnswerChoice < ActiveRecord::Migration[5.2]
  def change
    create_table :answer_choices do |t|
      t.string :answer_text
      t.timestamps
    end
    add_index :answer_choices, :answer_text
  end
end
