from .db import db

class User_Resume_Tag(db.Model):
    __tablename__ = "user_resume_tags"
    # id = db.Column(db.Integer, primary_key=True)
    user_tag_id = db.Column(db.Integer, db.ForeignKey("user_tags.id", onupdate="CASCADE", ondelete="CASCADE"), primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey("resumes.id", onupdate="CASCADE", ondelete="CASCADE"), primary_key=True)

    user_tag = db.relationship("User_Tag", back_populates="user_resume_tags")
    resume = db.relationship("Resume", back_populates="user_resume_tags")
