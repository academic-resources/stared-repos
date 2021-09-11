from .db import db

class Resume_Field(db.Model):
    __tablename__="resume_fields"
    id = db.Column(db.Integer, primary_key=True)
    resume_id = db.Column(db.Integer, db.ForeignKey("resumes.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    field_id = db.Column(db.Integer, db.ForeignKey("fields.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    page_order = db.Column(db.Integer, nullable=False)
    value = db.Column(db.String(1000), nullable=False)

    resume = db.relationship("Resume", back_populates="resume_fields")
    field = db.relationship("Field", back_populates="resume_fields")
