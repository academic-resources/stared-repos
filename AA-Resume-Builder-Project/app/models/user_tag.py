from .db import db

class User_Tag(db.Model):
    __tablename__ = 'user_tags'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    name = db.Column(db.String(30), nullable=False)

    user = db.relationship("User", back_populates='user_tags')
    user_resume_tags = db.relationship("User_Resume_Tag", back_populates='user_tag', cascade="all, delete-orphan")
