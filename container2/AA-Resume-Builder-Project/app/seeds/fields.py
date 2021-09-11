from app.models import db, Field

# Adds a demo user, you can add other users here if you want
def seed_fields():

    full_name = Field(name="full_name", placeholder="Full Name Here")
    db.session.add(full_name)

    github = Field(name="github", placeholder="GitHub Address")
    db.session.add(github)

    city = Field(name="city", placeholder="City")
    db.session.add(city)

    phone_number = Field(name="phone_number", placeholder="Phone Number")
    db.session.add(phone_number)

    email = Field(name="email", placeholder="Email")
    db.session.add(email)

    linkedin = Field(name="linkedin", placeholder="LinkedIn Address")
    db.session.add(linkedin)

    intro_header = Field(name="intro_header", placeholder="Desired Position (Ex. Fullstack Developer)")
    db.session.add(intro_header)

    intro_mission = Field(name="intro_mission", placeholder="Mission Statement (Ex. Spearhead multidisciplinary & novel approaches to increase workplace efficiency)")
    db.session.add(intro_mission)

    intro_long = Field(name="intro_long", placeholder="Detailed Mission (Ex. Pragmatic self-starter that designs tools and models using current technology to solve complex problems with combination of engineering knowledge and computer science programming methods.  Leverage experience in engineering lab research, computer science, athletic leadership positions, and high-pressure industrial environments to create and progress positive and attainable work goals and communicate essential information to teams of different backgrounds and exposure levels.")
    db.session.add(intro_long)

    intro_skill = Field(name="intro_skill", placeholder="Important Skill (Ex. Frontend React Development)")
    db.session.add(intro_skill)

    experience_company = Field(name="experience_company", placeholder="Company Name")
    db.session.add(experience_company)

    experience_city = Field(name="experience_city", placeholder="Company City")
    db.session.add(experience_city)

    experience_date = Field(name="experience_date", placeholder="Dates")
    db.session.add(experience_date)

    experience_description = Field(name="experience_description", placeholder="Role Description")
    db.session.add(experience_description)

    experience_title = Field(name="experience_title", placeholder="Role Title")
    db.session.add(experience_title)

    experience_responsibility = Field(name="experience_responsibility", placeholder="Primary Responsibility")
    db.session.add(experience_responsibility)

    education_facility = Field(name="education_facility", placeholder="Name of Facility")
    db.session.add(education_facility)

    education_degree = Field(name="education_degree", placeholder="Degree, Cert., Qualification")
    db.session.add(education_degree)

    education_graduation_date = Field(name="education_graduation_date", placeholder="Date Attended")
    db.session.add(education_graduation_date)

    eduction_gpa = Field(name="education_gpa", placeholder="GPA")
    db.session.add(eduction_gpa)

    education_minor = Field(name="education_minor", placeholder="Minor")
    db.session.add(education_minor)



    # contact = Field(name="contact", resume_html="""<div class="flex-vertical-align_start"><div class="flex-horizontal-space_between"><p>City</p><p>Phone Number</p></div><div class="flex-horizontal-space_between"><p>LinkedIn</p><p>Email</p></div></div>""", form_html="""<div><input type="text" name="city" id="city" placeholder="City" /><input type="text" name="phone_number" id="phone_number" placeholder="Phone Number" /><input type="text" name="linkedin_link" id="linkedin_link" placeholder="LinkedIn" /><input type="email" name="email" id="email" placeholder="Email" /></div>""")

    # introduction = Field(name="introduction", resume_html="""<div class="flex-vertical-align_start"><p>Title</p><p>Mission</p><p>Long Description</p></div>""", form_html="""<input type="textarea" name="title" id="title" placeholder="Title (Ex. Full Stack Software Engineer)" /><textarea name="Descriptors" id="Descriptors" placeholder="Mission (Ex.Spearhead multidisciplinary & novel approaches to increase workplace efficiency)"></textarea><textarea name="long_description" id="long_description" placeholder="Long Description"></textarea>""")

    # skill = Field(name="skill", resume_html="""<div class="flex-vertical-align_start"><li>Skill</li></div>""", form_html="""<input type="textarea" name="skill" id="skill" placeholder="Skill (Ex. Kicking Ass)" />""")

    # work_experience = Field(name="work_experience", resume_html="""<div class="flex-vertical-align_start"><div class="flex-horizontal-align-start"><h3>Company</h3><p>Job Location</p></div><h4>Job Title</h4><p>Job Description</p><div><li>Key Responsibility</li><li>Key Responsibility</li><li>Key Responsibility</li></div></div>""", form_html="""<input type="text" name="company_name" placeholder="Company" /><input type="text" name="job_location" placeholder="Job Location" /><input type="text" name="job_title" placeholder="Job Title" /><input type="textarea" name="job_description" id="job_description" placeholder="Job Description)" /> <input type="textarea" name="key_responsibility" id="key_responsibility" placeholder="Key Responsibility"/><input type="textarea" name="key_responsibility" id="key_responsibility" placeholder="Key Responsibility"/><input type="textarea" name="key_responsibility" id="key_responsibility" placeholder="Key Responsibility" />""")

    # db.session.add(main_header)
    # db.session.add(contact)
    # db.session.add(introduction)
    # db.session.add(skill)
    # db.session.add(work_experience)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_fields():
    db.session.execute('TRUNCATE fields CASCADE;')
    db.session.commit()
