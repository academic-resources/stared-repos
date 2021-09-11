from app.models import db, Folder


def seed_folders():

    db.session.add(Folder(name="Linux 101",
                          user_id=1,
                          category_id=2))
    db.session.add(Folder(name="Org Mode > Markdown",
                          user_id=1,
                          category_id=2))
    db.session.add(Folder(name="Project Ideas",
                          user_id=1,
                          category_id=8))
    db.session.add(Folder(name="JavaScript",
                          user_id=1,
                          category_id=6))
    db.session.add(Folder(name="Python",
                          user_id=1,
                          category_id=6))
    db.session.add(Folder(name="Daily Thoughts",
                          user_id=1,
                          category_id=1))

    db.session.commit()


def undo_folders():
    db.session.execute('TRUNCATE folders CASCADE;')
    db.session.commit()
