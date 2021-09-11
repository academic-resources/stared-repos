class AddSkillToCats < ActiveRecord::Migration
  def change
    add_column :cats, :skill, :string
  end
end
