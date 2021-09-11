from os import name
from .db import db


class FileType(db.Model):
    __tablename__ = "file_type"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)

    file = db.relationship("File", back_populates="file_type")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name
        }
