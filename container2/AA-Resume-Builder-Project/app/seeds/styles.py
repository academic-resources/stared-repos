from app.models import db, Style

# Adds a demo user, you can add other users here if you want
def seed_styles():

    colors = ("Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Black")
    types = ("Fancy", "Plain", "Ugly")

    for color in colors:
        for type in types:
            name = "-".join((type, color))
            db.session.add(Style(name=name))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_styles():
    # db.session.execute('TRUNCATE styles CASCADE;')
    db.session.commit()
