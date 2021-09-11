FactoryBot.define do
  factory :band do
    band { Faker::Music::RockBand.name }
  end
end
