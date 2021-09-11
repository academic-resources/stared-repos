from app.models import db, Category


def seed_categories():

    db.session.add(Category(name="Personal", user_id=None))
    db.session.add(Category(name="Notes", user_id=None))
    db.session.add(Category(name="Writing", user_id=None))
    db.session.add(Category(name="Work", user_id=None))
    db.session.add(Category(name="Project", user_id=None))
    db.session.add(Category(name="Coding", user_id=None))
    db.session.add(Category(name="Documentation", user_id=None))
    db.session.add(Category(name="Ideas", user_id=None))

    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories CASCADE;')
    db.session.commit()
