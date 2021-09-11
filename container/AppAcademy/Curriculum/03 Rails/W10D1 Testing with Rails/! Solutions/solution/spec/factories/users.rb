# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  username        :string(255)
#  password_digest :string(255)
#  session_token   :string(255)
#  created_at      :datetime
#  updated_at      :datetime
#  cheer_count     :integer
#

# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryBot.define do
  factory :user do
    username { Faker::Internet.user_name }
    password {"password"}

    factory :user_hw do
      username {"hello_world"}
    end

    factory :user_foo do
      username {"foo_bar"}
    end
  end
end
