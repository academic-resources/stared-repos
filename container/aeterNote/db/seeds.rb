# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)



User.find_by(email: 'pt@barnum.com').try(:destroy!)

User.create!([
  {email: 'pt@barnum.com', password: 'circus'}
])


history = Notebook.create!({title: "History", user_id: User.last.id})
animals = Notebook.create!({title: "Animals", user_id: User.last.id})
acts = Notebook.create!({title: "Acts", user_id: User.last.id})
competition = Notebook.create!({title: "Competition", user_id: User.last.id})
presentation = Notebook.create!({title: "Presentation", user_id: User.last.id})


aeternote = Note.create({title: 'æterNote', content: '', user_id: User.last.id, notebook_id: presentation.id})
summary = Note.create!({title: "Summary", content: "", user_id: User.last.id, notebook_id: history.id })
jenny_lind = Note.create!({title: "Jenny Lind", content: "", user_id: User.last.id, notebook_id: acts.id })
elephants = Note.create!({title: 'Elephants', content: '', user_id: User.last.id, notebook_id: animals.id})
monkeys = Note.create!({title: 'Monkeys', content: '', user_id: User.last.id, notebook_id: animals.id})
lions = Note.create!({title: 'Lions', content: '', user_id: User.last.id, notebook_id: animals.id})
high_wire = Note.create!({title: 'High Wire', content: '', user_id: User.last.id, notebook_id: acts.id})
globe_of_death = Note.create!({title: 'Globe of Death', content: '', user_id: User.last.id, notebook_id: acts.id})
greatest_show_on_earth = Note.create!({title: "Barnum and Bailey's Greatest Show on Earth", content: '', user_id: User.last.id, notebook_id: history.id})
ringling_bros = Note.create!({title: "Ringling_Brothers", content: '', user_id: User.last.id, notebook_id: competition.id})

fun = Tag.create!({label: 'Fun', user_id: User.last.id})
boring = Tag.create!({label: 'Boring', user_id: User.last.id})
exciting = Tag.create!({label: 'Exciting', user_id: User.last.id})
work = Tag.create!({label: 'Work', user_id: User.last.id})

Tagging.create!({note_id: aeternote.id, tag_id: work.id})
Tagging.create!({note_id: summary.id, tag_id: boring.id})
Tagging.create!({note_id: elephants.id, tag_id: exciting.id})
Tagging.create!({note_id: monkeys.id, tag_id: exciting.id})
Tagging.create!({note_id: high_wire.id, tag_id: exciting.id})
Tagging.create!({note_id: globe_of_death.id, tag_id: exciting.id})
Tagging.create!({note_id: jenny_lind.id, tag_id: boring.id})
Tagging.create!({note_id: aeternote.id, tag_id: fun.id})
Tagging.create!({note_id: ringling_bros.id, tag_id: work.id})
