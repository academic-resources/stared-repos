from .db import db

class Field(db.Model):
    __tablename__ = 'fields'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)
    placeholder = db.Column(db.String(1000), nullable=False)

    template_fields = db.relationship("Template_Field", back_populates='field')
    resume_fields = db.relationship("Resume_Field", back_populates='field')
