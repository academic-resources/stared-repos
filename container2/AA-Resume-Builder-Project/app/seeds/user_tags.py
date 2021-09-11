from app.models import db, User_Tag

# Adds a demo user, you can add other users here if you want
def seed_user_tags():

    colors = ("Crimson", "Orange", "Sunshine", "Grass", "Sky", "Magenta")
    types = ("Engineering", "Art", "Writer")

    for color in colors:
        for type in types:
            name = "-".join((type, color))
            db.session.add(User_Tag(name=name, user_id=1))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_user_tags():
    db.session.execute('TRUNCATE user_tags CASCADE;')
    db.session.commit()
