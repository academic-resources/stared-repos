from app.models import db, Template

# Adds a demo user, you can add other users here if you want
def seed_templates():

    template_names = ("Skill Oriented", "Fundamental", "Chronological")

    for name in template_names:
        db.session.add(Template(name=name))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_templates():
    db.session.execute('TRUNCATE templates CASCADE;')
    db.session.commit()
