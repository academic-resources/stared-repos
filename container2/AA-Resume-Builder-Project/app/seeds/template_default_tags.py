from app.models import db, Template_Default_Tag

# Adds a demo user, you can add other users here if you want
def seed_template_default_tags():

    db.session.add(Template_Default_Tag(default_tag_id=1, template_id=1))
    db.session.add(Template_Default_Tag(default_tag_id=2, template_id=2))
    db.session.add(Template_Default_Tag(default_tag_id=3, template_id=3))
    db.session.add(Template_Default_Tag(default_tag_id=3, template_id=2))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_template_default_tags():
    db.session.execute('TRUNCATE template_default_tags CASCADE;')
    db.session.commit()
