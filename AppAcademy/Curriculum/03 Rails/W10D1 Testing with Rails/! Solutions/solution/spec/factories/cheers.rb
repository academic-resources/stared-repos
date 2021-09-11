# == Schema Information
#
# Table name: cheers
#
#  id         :integer          not null, primary key
#  giver_id   :integer
#  goal_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryBot.define do
  factory :cheer do
  end
end
