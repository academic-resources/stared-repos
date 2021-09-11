# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Cat.destroy_all

colors = %w(calico white brown persian-blue orange black)
sexes = %w(M F)

20.times do
  Cat.create(birth_date: Faker::Date.birthday(0, 15), color: colors.sample,
             name: Faker::FunnyName.unique.name, sex: sexes.sample,
             description: Faker::Lorem.sentence(10, true, 4))
end
