from app.models import db, Resume_Field

# Adds a demo user, you can add other users here if you want
def seed_resume_fields():
    # full_name (1)
    db.session.add(Resume_Field(resume_id=1, field_id=1, page_order=1, value="Demo User"))
    db.session.add(Resume_Field(resume_id=2, field_id=1, page_order=1, value="Demo User"))
    db.session.add(Resume_Field(resume_id=3, field_id=1, page_order=1, value="Demo User"))
    # github (2)
    db.session.add(Resume_Field(resume_id=1, field_id=2, page_order=2, value="demo.user@github.com"))
    db.session.add(Resume_Field(resume_id=2, field_id=2, page_order=2, value="demo.user@github.com"))
    db.session.add(Resume_Field(resume_id=3, field_id=2, page_order=2, value="demo.user@github.com"))
    # city (3)
    db.session.add(Resume_Field(resume_id=1, field_id=3, page_order=3, value="Fake City, FS"))
    db.session.add(Resume_Field(resume_id=2, field_id=3, page_order=3, value="Fake City, FS"))
    db.session.add(Resume_Field(resume_id=3, field_id=3, page_order=3, value="Fake City, FS"))

    # phone_number (4)
    db.session.add(Resume_Field(resume_id=1, field_id=4, page_order=4, value="(555) 555-5555"))
    db.session.add(Resume_Field(resume_id=2, field_id=4, page_order=4, value="(555) 555-5555"))
    db.session.add(Resume_Field(resume_id=3, field_id=4, page_order=4, value="(555) 555-5555"))

    # email (5)
    db.session.add(Resume_Field(resume_id=1, field_id=5, page_order=5, value="demo.user@gmail.com"))
    db.session.add(Resume_Field(resume_id=2, field_id=5, page_order=5, value="demo.user@gmail.com"))
    db.session.add(Resume_Field(resume_id=3, field_id=5, page_order=5, value="demo.user@gmail.com"))

    # linkedin (5)
    db.session.add(Resume_Field(resume_id=2, field_id=6, page_order=6, value="linkedin.com/in/DemoUser"))
    db.session.add(Resume_Field(resume_id=3, field_id=6, page_order=6, value="linkedin.com/in/DemoUser"))
    db.session.add(Resume_Field(resume_id=1, field_id=6, page_order=6, value="linkedin.com/in/DemoUser"))

    # intro_header (7)
    db.session.add(Resume_Field(resume_id=1, field_id=7, page_order=7, value="Full Stack Software Engineer"))
    db.session.add(Resume_Field(resume_id=2, field_id=7, page_order=7, value="Full Stack Software Engineer"))
    db.session.add(Resume_Field(resume_id=3, field_id=7, page_order=7, value="Full Stack Software Engineer"))

    # intro_mission (8)
    db.session.add(Resume_Field(resume_id=1, field_id=8, page_order=8, value="Write the best code this side of the M I S S I P P I"))
    db.session.add(Resume_Field(resume_id=2, field_id=8, page_order=8, value="Write the best code this side of the M I S S I P P I"))
    db.session.add(Resume_Field(resume_id=3, field_id=8, page_order=8, value="Write the best code this side of the M I S S I P P I"))

    # intro_long (9)
    db.session.add(Resume_Field(resume_id=1, field_id=9, page_order=9, value="Pragmatic self-starter that designs tools and models using current technology to solve complex problems with combination of engineering knowledge and computer science programming methods.  Leverage experience in engineering lab research, computer science, athletic leadership positions, and high-pressure industrial environments to create and progress positive and attainable work goals and communicate essential information to teams of different backgrounds and exposure levels."))
    db.session.add(Resume_Field(resume_id=2, field_id=9, page_order=9, value="Pragmatic self-starter that designs tools and models using current technology to solve complex problems with combination of engineering knowledge and computer science programming methods.  Leverage experience in engineering lab research, computer science, athletic leadership positions, and high-pressure industrial environments to create and progress positive and attainable work goals and communicate essential information to teams of different backgrounds and exposure levels."))
    db.session.add(Resume_Field(resume_id=3, field_id=9, page_order=9, value="Pragmatic self-starter that designs tools and models using current technology to solve complex problems with combination of engineering knowledge and computer science programming methods.  Leverage experience in engineering lab research, computer science, athletic leadership positions, and high-pressure industrial environments to create and progress positive and attainable work goals and communicate essential information to teams of different backgrounds and exposure levels."))

    # intro_skill (10)
    db.session.add(Resume_Field(resume_id=1, field_id=10, page_order=10, value="Coding Fast"))
    db.session.add(Resume_Field(resume_id=1, field_id=10, page_order=11, value="Coding Slow"))
    db.session.add(Resume_Field(resume_id=1, field_id=10, page_order=12, value="Coding High"))
    db.session.add(Resume_Field(resume_id=1, field_id=10, page_order=13, value="Coding Low"))

    db.session.add(Resume_Field(resume_id=2, field_id=10, page_order=10, value="Coding Fast"))
    db.session.add(Resume_Field(resume_id=2, field_id=10, page_order=11, value="Coding Slow"))
    db.session.add(Resume_Field(resume_id=2, field_id=10, page_order=12, value="Coding High"))
    db.session.add(Resume_Field(resume_id=2, field_id=10, page_order=13, value="Coding Low"))

    db.session.add(Resume_Field(resume_id=3, field_id=10, page_order=10, value="Coding Fast"))
    db.session.add(Resume_Field(resume_id=3, field_id=10, page_order=11, value="Coding Slow"))
    db.session.add(Resume_Field(resume_id=3, field_id=10, page_order=12, value="Coding High"))
    db.session.add(Resume_Field(resume_id=3, field_id=10, page_order=13, value="Coding Low"))
    db.session.add(Resume_Field(resume_id=3, field_id=10, page_order=14, value="Yodeling"))
    db.session.add(Resume_Field(resume_id=3, field_id=10, page_order=15, value="Cost Analysis and Control"))
    db.session.add(Resume_Field(resume_id=3, field_id=10, page_order=16, value="Gummy Bear Eating Contests"))
    db.session.add(Resume_Field(resume_id=3, field_id=10, page_order=17, value="Making Stuff Up"))

    # experience_company (11)
    # experience_city (12)
    # experience_date (13)
    # experience_title (15)
    # experience_description (14)
    # experience_responsibility (16)

    db.session.add(Resume_Field(resume_id=1, field_id=11, page_order=14, value="Demo Company"))
    db.session.add(Resume_Field(resume_id=1, field_id=12, page_order=15, value="Fake City, FS"))
    db.session.add(Resume_Field(resume_id=1, field_id=13, page_order=16, value="May 2019 - Present"))
    db.session.add(Resume_Field(resume_id=1, field_id=15, page_order=17, value="Fake Website User"))
    db.session.add(Resume_Field(resume_id=1, field_id=14, page_order=18, value="Fill in gaps on AA websites to make them look better"))
    db.session.add(Resume_Field(resume_id=1, field_id=16, page_order=19, value="Frequently logging in and logging out of the website, increasing recruiter traffic by 30000% and landing students 7 figure jobs."))

    db.session.add(Resume_Field(resume_id=1, field_id=11, page_order=20, value="Demo Company"))
    db.session.add(Resume_Field(resume_id=1, field_id=12, page_order=21, value="Fake City, FS"))
    db.session.add(Resume_Field(resume_id=1, field_id=13, page_order=22, value="Aug 2012 - April 2019"))
    db.session.add(Resume_Field(resume_id=1, field_id=15, page_order=23, value="Fake Website User"))
    db.session.add(Resume_Field(resume_id=1, field_id=14, page_order=24, value="Fill in gaps on AA websites to make them look better"))
    db.session.add(Resume_Field(resume_id=1, field_id=16, page_order=25, value="Frequently logging in and logging out of the website, increasing recruiter traffic by 30000% and landing students 7 figure jobs."))

    db.session.add(Resume_Field(resume_id=1, field_id=11, page_order=26, value="Demo Company"))
    db.session.add(Resume_Field(resume_id=1, field_id=12, page_order=27, value="Fake City, FS"))
    db.session.add(Resume_Field(resume_id=1, field_id=13, page_order=28, value="June 2012 - Aug 2012"))
    db.session.add(Resume_Field(resume_id=1, field_id=15, page_order=29, value="Fake Website User"))
    db.session.add(Resume_Field(resume_id=1, field_id=14, page_order=30, value="Fill in gaps on AA websites to make them look better"))
    db.session.add(Resume_Field(resume_id=1, field_id=16, page_order=31, value="Frequently logging in and logging out of the website, increasing recruiter traffic by 30000% and landing students 7 figure jobs."))

    db.session.add(Resume_Field(resume_id=2, field_id=11, page_order=14, value="Demo Company"))
    db.session.add(Resume_Field(resume_id=2, field_id=12, page_order=15, value="Fake City, FS"))
    db.session.add(Resume_Field(resume_id=2, field_id=13, page_order=16, value="May 2019 - Present"))
    db.session.add(Resume_Field(resume_id=2, field_id=15, page_order=17, value="Fake Website User"))
    db.session.add(Resume_Field(resume_id=2, field_id=14, page_order=18, value="Fill in gaps on AA websites to make them look better"))
    db.session.add(Resume_Field(resume_id=2, field_id=16, page_order=19, value="Frequently logging in and logging out of the website, increasing recruiter traffic by 30000% and landing students 7 figure jobs."))

    db.session.add(Resume_Field(resume_id=2, field_id=11, page_order=20, value="Demo Company"))
    db.session.add(Resume_Field(resume_id=2, field_id=12, page_order=21, value="Fake City, FS"))
    db.session.add(Resume_Field(resume_id=2, field_id=13, page_order=22, value="Aug 2012 - April 2019"))
    db.session.add(Resume_Field(resume_id=2, field_id=15, page_order=23, value="Fake Website User"))
    db.session.add(Resume_Field(resume_id=2, field_id=14, page_order=24, value="Fill in gaps on AA websites to make them look better"))
    db.session.add(Resume_Field(resume_id=2, field_id=16, page_order=25, value="Frequently logging in and logging out of the website, increasing recruiter traffic by 30000% and landing students 7 figure jobs."))


    db.session.add(Resume_Field(resume_id=3, field_id=11, page_order=18, value="Demo Company"))
    db.session.add(Resume_Field(resume_id=3, field_id=12, page_order=19, value="Fake City, FS"))
    db.session.add(Resume_Field(resume_id=3, field_id=13, page_order=20, value="May 2019 - Present"))
    db.session.add(Resume_Field(resume_id=3, field_id=15, page_order=21, value="Fake Website User"))
    db.session.add(Resume_Field(resume_id=3, field_id=14, page_order=22, value="Fill in gaps on AA websites to make them look better"))
    db.session.add(Resume_Field(resume_id=3, field_id=16, page_order=23, value="Frequently logging in and logging out of the website, increasing recruiter traffic by 30000% and landing students 7 figure jobs."))

    # education_facility (17)
    # education_degree (18)
    # education_minor (21)
    # education_graduation_date (19)
    # education_gpa (20)
    db.session.add(Resume_Field(resume_id=1, field_id=17, page_order=32, value="Demo Harvard University"))
    db.session.add(Resume_Field(resume_id=1, field_id=18, page_order=33, value="MS Demo Users"))
    db.session.add(Resume_Field(resume_id=1, field_id=21, page_order=34, value="Logging In"))
    db.session.add(Resume_Field(resume_id=1, field_id=19, page_order=35, value="Ongoing"))
    db.session.add(Resume_Field(resume_id=1, field_id=20, page_order=36, value="4.0"))

    db.session.add(Resume_Field(resume_id=2, field_id=17, page_order=26, value="App Academy"))
    db.session.add(Resume_Field(resume_id=2, field_id=18, page_order=27, value="Full Stack Software Engineering"))
    db.session.add(Resume_Field(resume_id=2, field_id=19, page_order=28, value="March 2021"))

    db.session.add(Resume_Field(resume_id=3, field_id=17, page_order=24, value="Demo Harvard University"))
    db.session.add(Resume_Field(resume_id=3, field_id=18, page_order=25, value="MS Demo Users"))
    db.session.add(Resume_Field(resume_id=3, field_id=21, page_order=26, value="Logging In"))
    db.session.add(Resume_Field(resume_id=3, field_id=19, page_order=27, value="Ongoing"))
    db.session.add(Resume_Field(resume_id=3, field_id=20, page_order=28, value="4.0"))

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key

def undo_resume_fields():
    db.session.execute('TRUNCATE resume_fields CASCADE;')
    db.session.commit()
