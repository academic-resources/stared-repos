# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

benches = Bench.create([
  { description: "very nice bench", lat: 37.771018, lng: -122.446556 },
  { description: "beautiful view", lat: 37.771953, lng: -122.446189 },
  { description: "a little hard for my liking", lat: 37.776858, lng: -122.441781 },
  { description: "gets hot in summertime", lat: 37.805372, lng: -122.437946 },
  { description: "very ugly bench", lat: 37.804970, lng: -122.447020 },
])
