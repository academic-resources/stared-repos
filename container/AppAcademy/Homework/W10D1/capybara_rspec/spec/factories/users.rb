FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    # password { Faker::Food.fruit }
    password { 'music!' }
  end
end
