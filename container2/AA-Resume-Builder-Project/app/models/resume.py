from .db import db
from .user_resume_tag import User_Resume_Tag

class Resume(db.Model):
    __tablename__ = 'resumes'
    id = db.Column(db.Integer, primary_key=True)
    html = db.Column(db.Text, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    style_id = db.Column(db.Integer, db.ForeignKey('styles.id', onupdate="CASCADE", ondelete="CASCADE"), nullable=False)

    user = db.relationship("User", back_populates="resumes")
    style = db.relationship("Style", back_populates="resumes")
    user_resume_tags = db.relationship("User_Resume_Tag", back_populates="resume", cascade="all, delete-orphan")
    resume_fields = db.relationship("Resume_Field", back_populates="resume", cascade="all, delete-orphan")
