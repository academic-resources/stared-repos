# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

todo01 = Todo.create(title: 'Walk the Dog', body: 'use the new leash', done: 'false')
todo02 = Todo.create(title: 'Feed the Cat', body: 'but new kibble soon', done: 'false')
todo03 = Todo.create(title: 'Feed the Mouse', body: 'give medicine too', done: 'true')