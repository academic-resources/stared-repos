from app.models import db, Resume

# Adds a demo user, you can add other users here if you want
def seed_resumes():

    sample_resume_1 = Resume(html="""<h1>THIS IS A SAMPLE RESUME </h1><p>WOW IT WORKS</p>""", user_id=1,style_id=1)
    sample_resume_2 = Resume(html="""<h1>THIS IS ALSO A SAMPLE RESUME </h1><p>WOW IT ALSO WORKS</p>""", user_id=1,style_id=10)
    sample_resume_3 = Resume(html="""<h1>THIS IS A THIRD SAMPLE RESUME </h1><p>WOW WOW WOW IT ALSO WORKS</p>""", user_id=1,style_id=3)

    db.session.add(sample_resume_1)
    db.session.add(sample_resume_2)
    db.session.add(sample_resume_3)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_resumes():
    db.session.execute('TRUNCATE resumes CASCADE;')
    db.session.commit()
