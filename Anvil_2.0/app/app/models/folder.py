import datetime
from .db import db


class Folder(db.Model):
    __tablename__ = "folders"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id',
                                      onupdate="CASCADE",
                                      ondelete="CASCADE"),
                        nullable=False)
    category_id = db.Column(db.Integer,
                            db.ForeignKey('categories.id',
                                          onupdate="CASCADE",
                                          ondelete="CASCADE"),
                            nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    user = db.relationship("User", back_populates="folder")
    category = db.relationship("Category", back_populates="folder")
    file = db.relationship("File", back_populates="folder")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "category": {"id": self.category.id, "name": self.category.name},
            "files": [user_file.to_dict() for user_file in self.file]
        }
