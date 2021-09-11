from .db import db


class Tag(db.Model):
    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey('users.id',
                                      onupdate="CASCADE",
                                      ondelete="CASCADE"),
                        nullable=True)

    user = db.relationship("User", back_populates="tag")
    file_tag = db.relationship("FileTag", back_populates="tag")
