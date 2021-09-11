from app.models import db, FileType


def seed_file_types():

    db.session.add(FileType(name=".txt"))
    db.session.add(FileType(name=".md"))
    db.session.add(FileType(name=".py"))
    db.session.add(FileType(name=".js"))
    db.session.add(FileType(name=".html"))
    db.session.add(FileType(name=".css"))
    db.session.add(FileType(name=".rtf"))
    db.session.add(FileType(name=".pug"))
    db.session.add(FileType(name=".json"))
    db.session.add(FileType(name=".yaml"))
    db.session.add(FileType(name=".sql"))

    db.session.commit()


def undo_file_types():
    db.session.execute('TRUNCATE file_types CASCADE;')
    db.session.commit()
