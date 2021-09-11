# == Schema Information
#
# Table name: goals
#
#  id         :integer          not null, primary key
#  title      :string(255)
#  private    :boolean          default(FALSE)
#  details    :text
#  completed  :boolean          default(FALSE)
#  user_id    :integer
#  created_at :datetime
#  updated_at :datetime
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryBot.define do
  factory :goal do
    title { Faker::Lorem.words(3).join(" ") }
    details { Faker::Lorem.words(5).join(" ") }
  end
end
