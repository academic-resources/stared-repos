# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.create([
  {
    name: "Harry Houdini",
    email: "harry@gcloud.ai",
    password: "harryhoudini",
    username: "harry" + rand(10000).to_s,
  },
  {
    name: "Another User",
    email: "something@else.com",
    password: "somethingelse",
    username: "something" + rand(10000).to_s,
  },

])

Team.create([
  { title: "Team A", user_id: 1 },
  { title: "Team B", user_id: 1 },
])

TeamMembership.create([
  { user_id: 1, team_id: 1 },
  { user_id: 1, team_id: 2 },
  { user_id: 2, team_id: 1 },
])
