from .db import db
import datetime


class FileTag(db.Model):
    __tablename__ = "file_tag"

    id = db.Column(db.Integer, primary_key=True)
    file_id = db.Column(db.Integer,
                        db.ForeignKey('files.id',
                                      onupdate="CASCADE",
                                      ondelete="CASCADE"),
                        nullable=False)
    tag_id = db.Column(db.Integer,
                       db.ForeignKey('tags.id',
                                     onupdate="CASCADE",
                                     ondelete="CASCADE"),
                       nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.datetime.utcnow)

    file = db.relationship("File", back_populates="file_tag")
    tag = db.relationship("Tag", back_populates="file_tag")

    def to_dict(self):
        return {
            "id": self.id,
            "tags": [user_file_tags for user_file_tags in self.tag]
        }
