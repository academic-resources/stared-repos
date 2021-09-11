from app.models import db, Default_Tag

def seed_default_tags():

    types = ("College", "Professional", "Internship", "Co-op")

    for type in types:
        db.session.add(Default_Tag(name=type))

    db.session.commit()

def undo_default_tags():
  db.session.execute('TRUNCATE default_tags CASCADE;')
  db.session.commit()
