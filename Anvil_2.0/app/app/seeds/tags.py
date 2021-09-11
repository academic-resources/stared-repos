from app.models import db, Tag


def seed_tags():

    db.session.add(Tag(name="Important", user_id=None))
    db.session.add(Tag(name="Thoughts", user_id=None))
    db.session.add(Tag(name="Work", user_id=None))
    db.session.add(Tag(name="Notes", user_id=None))
    db.session.add(Tag(name="Scratch Pad", user_id=None))
    db.session.add(Tag(name="To-Do", user_id=None))
    db.session.add(Tag(name="Documentation", user_id=None))
    db.session.add(Tag(name="Brainstorming", user_id=None))

    db.session.commit()


def undo_tags():
    db.session.execute('TRUNCATE tags CASCADE;')
    db.session.commit()
