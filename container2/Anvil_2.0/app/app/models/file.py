import datetime
from .db import db


class File(db.Model):
    __tablename__ = 'files'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    content = db.Column(db.Text(), nullable=True)
    s3_url = db.Column(db.String(255), nullable=True)
    folder_id = db.Column(db.Integer,
                          db.ForeignKey('folders.id',
                                        onupdate="CASCADE",
                                        ondelete="CASCADE"),
                          nullable=False)
    file_type_id = db.Column(db.Integer,
                             db.ForeignKey('file_type.id',
                                           onupdate="CASCADE",
                                           ondelete="CASCADE"),
                             nullable=True)

    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    file_type = db.relationship("FileType", back_populates="file")
    file_tag = db.relationship("FileTag", back_populates="file")
    folder = db.relationship("Folder", back_populates="file")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "content": self.content,
            "s3_url": self.s3_url,
            "file_type": self.file_type.to_dict(),
            "created_at": self.created_at,
            "updated_at": self.updated_at,
            "file_tags": [user_file_tag.to_dict() for user_file_tag in self.file_tag],
        }
