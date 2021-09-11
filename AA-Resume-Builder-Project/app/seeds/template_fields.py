from app.models import db, Template_Field

# Adds a demo user, you can add other users here if you want
def seed_template_fields():
    # full_name (1)
    db.session.add(Template_Field(template_id=1, field_id=1, page_order=1))
    db.session.add(Template_Field(template_id=2, field_id=1, page_order=1))
    db.session.add(Template_Field(template_id=3, field_id=1, page_order=1))
    # github (2)
    db.session.add(Template_Field(template_id=1, field_id=2, page_order=2))
    db.session.add(Template_Field(template_id=2, field_id=2, page_order=2))
    db.session.add(Template_Field(template_id=3, field_id=2, page_order=2))
    # city (3)
    db.session.add(Template_Field(template_id=1, field_id=3, page_order=3))
    db.session.add(Template_Field(template_id=2, field_id=3, page_order=3))
    db.session.add(Template_Field(template_id=3, field_id=3, page_order=3))

    # phone_number (4)
    db.session.add(Template_Field(template_id=1, field_id=4, page_order=4))
    db.session.add(Template_Field(template_id=2, field_id=4, page_order=4))
    db.session.add(Template_Field(template_id=3, field_id=4, page_order=4))

    # email (5)
    db.session.add(Template_Field(template_id=1, field_id=5, page_order=5))
    db.session.add(Template_Field(template_id=2, field_id=5, page_order=5))
    db.session.add(Template_Field(template_id=3, field_id=5, page_order=5))

    # linkedin (5)
    db.session.add(Template_Field(template_id=2, field_id=6, page_order=6))
    db.session.add(Template_Field(template_id=3, field_id=6, page_order=6))
    db.session.add(Template_Field(template_id=1, field_id=6, page_order=6))

    # intro_header (7)
    db.session.add(Template_Field(template_id=1, field_id=7, page_order=7))
    db.session.add(Template_Field(template_id=2, field_id=7, page_order=7))
    db.session.add(Template_Field(template_id=3, field_id=7, page_order=7))

    # intro_mission (8)
    db.session.add(Template_Field(template_id=1, field_id=8, page_order=8))
    db.session.add(Template_Field(template_id=2, field_id=8, page_order=8))
    db.session.add(Template_Field(template_id=3, field_id=8, page_order=8))

    # intro_long (9)
    db.session.add(Template_Field(template_id=1, field_id=9, page_order=9))
    db.session.add(Template_Field(template_id=2, field_id=9, page_order=9))
    db.session.add(Template_Field(template_id=3, field_id=9, page_order=9))

    # intro_skill (10)
    db.session.add(Template_Field(template_id=1, field_id=10, page_order=10))
    db.session.add(Template_Field(template_id=1, field_id=10, page_order=11))
    db.session.add(Template_Field(template_id=1, field_id=10, page_order=12))
    db.session.add(Template_Field(template_id=1, field_id=10, page_order=13))

    db.session.add(Template_Field(template_id=2, field_id=10, page_order=10))
    db.session.add(Template_Field(template_id=2, field_id=10, page_order=11))
    db.session.add(Template_Field(template_id=2, field_id=10, page_order=12))
    db.session.add(Template_Field(template_id=2, field_id=10, page_order=13))

    db.session.add(Template_Field(template_id=3, field_id=10, page_order=10))
    db.session.add(Template_Field(template_id=3, field_id=10, page_order=11))
    db.session.add(Template_Field(template_id=3, field_id=10, page_order=12))
    db.session.add(Template_Field(template_id=3, field_id=10, page_order=13))
    db.session.add(Template_Field(template_id=3, field_id=10, page_order=14))
    db.session.add(Template_Field(template_id=3, field_id=10, page_order=15))
    db.session.add(Template_Field(template_id=3, field_id=10, page_order=16))
    db.session.add(Template_Field(template_id=3, field_id=10, page_order=17))

    # experience_company (11)
    # experience_city (12)
    # experience_date (13)
    # experience_title (15)
    # experience_description (14)
    # experience_responsibility (16)

    db.session.add(Template_Field(template_id=1, field_id=11, page_order=14))
    db.session.add(Template_Field(template_id=1, field_id=12, page_order=15))
    db.session.add(Template_Field(template_id=1, field_id=13, page_order=16))
    db.session.add(Template_Field(template_id=1, field_id=15, page_order=17))
    db.session.add(Template_Field(template_id=1, field_id=14, page_order=18))
    db.session.add(Template_Field(template_id=1, field_id=16, page_order=19))

    db.session.add(Template_Field(template_id=1, field_id=11, page_order=20))
    db.session.add(Template_Field(template_id=1, field_id=12, page_order=21))
    db.session.add(Template_Field(template_id=1, field_id=13, page_order=22))
    db.session.add(Template_Field(template_id=1, field_id=15, page_order=23))
    db.session.add(Template_Field(template_id=1, field_id=14, page_order=24))
    db.session.add(Template_Field(template_id=1, field_id=16, page_order=25))

    db.session.add(Template_Field(template_id=1, field_id=11, page_order=26))
    db.session.add(Template_Field(template_id=1, field_id=12, page_order=27))
    db.session.add(Template_Field(template_id=1, field_id=13, page_order=28))
    db.session.add(Template_Field(template_id=1, field_id=15, page_order=29))
    db.session.add(Template_Field(template_id=1, field_id=14, page_order=30))
    db.session.add(Template_Field(template_id=1, field_id=16, page_order=31))

    db.session.add(Template_Field(template_id=2, field_id=11, page_order=14))
    db.session.add(Template_Field(template_id=2, field_id=12, page_order=15))
    db.session.add(Template_Field(template_id=2, field_id=13, page_order=16))
    db.session.add(Template_Field(template_id=2, field_id=15, page_order=17))
    db.session.add(Template_Field(template_id=2, field_id=14, page_order=18))
    db.session.add(Template_Field(template_id=2, field_id=16, page_order=19))

    db.session.add(Template_Field(template_id=2, field_id=11, page_order=20))
    db.session.add(Template_Field(template_id=2, field_id=12, page_order=21))
    db.session.add(Template_Field(template_id=2, field_id=13, page_order=22))
    db.session.add(Template_Field(template_id=2, field_id=15, page_order=23))
    db.session.add(Template_Field(template_id=2, field_id=14, page_order=24))
    db.session.add(Template_Field(template_id=2, field_id=16, page_order=25))


    db.session.add(Template_Field(template_id=3, field_id=11, page_order=18))
    db.session.add(Template_Field(template_id=3, field_id=12, page_order=19))
    db.session.add(Template_Field(template_id=3, field_id=13, page_order=20))
    db.session.add(Template_Field(template_id=3, field_id=15, page_order=21))
    db.session.add(Template_Field(template_id=3, field_id=14, page_order=22))
    db.session.add(Template_Field(template_id=3, field_id=16, page_order=23))

    # education_facility (17)
    # education_degree (18)
    # education_minor (21)
    # education_graduation_date (19)
    # education_gpa (20)
    db.session.add(Template_Field(template_id=1, field_id=17, page_order=32))
    db.session.add(Template_Field(template_id=1, field_id=18, page_order=33))
    db.session.add(Template_Field(template_id=1, field_id=21, page_order=34))
    db.session.add(Template_Field(template_id=1, field_id=19, page_order=35))
    db.session.add(Template_Field(template_id=1, field_id=20, page_order=36))

    db.session.add(Template_Field(template_id=2, field_id=17, page_order=26))
    db.session.add(Template_Field(template_id=2, field_id=18, page_order=27))
    db.session.add(Template_Field(template_id=2, field_id=21, page_order=28))
    db.session.add(Template_Field(template_id=2, field_id=19, page_order=29))
    db.session.add(Template_Field(template_id=2, field_id=20, page_order=30))

    db.session.add(Template_Field(template_id=3, field_id=17, page_order=24))
    db.session.add(Template_Field(template_id=3, field_id=18, page_order=25))
    db.session.add(Template_Field(template_id=3, field_id=21, page_order=26))
    db.session.add(Template_Field(template_id=3, field_id=19, page_order=27))
    db.session.add(Template_Field(template_id=3, field_id=20, page_order=28))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key

def undo_template_fields():
    db.session.execute('TRUNCATE template_fields CASCADE;')
    db.session.commit()
