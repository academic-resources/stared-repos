# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user1 = User.create(username: "gcoooop")
user2 = User.create(username: "ollies_follies")
user3 = User.create(username: "conpot")
user4 = User.create(username: "poooocg")

q1 = Question.create(text: "Red or Blue?", poll_id: 1)
q2 = Question.create(text: "PS4 or Xbox", poll_id: 2)
q3 = Question.create(text: "Classic rock G.O.A.Ts?", poll_id: 3)

p1 = Poll.create(title: "Color", author_id: 1)
p2 = Poll.create(title: "Gaming System", author_id: 2)
p3 = Poll.create(title: "GOATs", author_id: 3)

ac1 = AnswerChoice.create(answer_text: "Red", question_id: 1)
ac2 = AnswerChoice.create(answer_text: "Blue", question_id: 1)
ac3 = AnswerChoice.create(answer_text: "PS4", question_id: 2)
ac4 = AnswerChoice.create(answer_text: "Xbox", question_id: 2)
ac5 = AnswerChoice.create(answer_text: "Metallica", question_id: 3)
ac6 = AnswerChoice.create(answer_text: "AC/DC", question_id: 3)
ac7 = AnswerChoice.create(answer_text: "Queen", question_id: 3)

r1 = Response.create(user_id: 2, answer_choice_id: 6)
r2 = Response.create(user_id: 4, answer_choice_id: 5)
r3 = Response.create(user_id: 3, answer_choice_id: 4)
r4 = Response.create(user_id: 1, answer_choice_id: 3)
r5 = Response.create(user_id: 2, answer_choice_id: 3)
r6 = Response.create(user_id: 4, answer_choice_id: 3)
r7 = Response.create(user_id: 3, answer_choice_id: 2)
r8 = Response.create(user_id: 1, answer_choice_id: 1)