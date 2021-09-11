from .db import db

class Template_Field(db.Model):
    __tablename__="template_fields"
    id = db.Column(db.Integer, primary_key=True)
    template_id = db.Column(db.Integer, db.ForeignKey("templates.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    field_id = db.Column(db.Integer, db.ForeignKey("fields.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    page_order = db.Column(db.Integer, nullable=False)

    templates = db.relationship("Template", back_populates="template_fields")
    field = db.relationship("Field", back_populates="template_fields")
