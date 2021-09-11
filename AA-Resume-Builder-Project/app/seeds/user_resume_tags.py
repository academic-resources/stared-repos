from app.models import db, User_Resume_Tag

# Adds a demo user, you can add other users here if you want
def seed_user_resume_tags():

    db.session.add(User_Resume_Tag(user_tag_id=7, resume_id=1))
    db.session.add(User_Resume_Tag(user_tag_id=3, resume_id=2))
    db.session.add(User_Resume_Tag(user_tag_id=8, resume_id=2))
    db.session.add(User_Resume_Tag(user_tag_id=5, resume_id=1))
    db.session.add(User_Resume_Tag(user_tag_id=6, resume_id=2))
    db.session.add(User_Resume_Tag(user_tag_id=1, resume_id=3))
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_user_resume_tags():
    db.session.execute('TRUNCATE user_resume_tags CASCADE;')
    db.session.commit()
