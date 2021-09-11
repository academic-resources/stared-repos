from .db import db

class Template_Default_Tag(db.Model):
    __tablename__ = 'template_default_tags'
    id = db.Column(db.Integer, primary_key=True)
    default_tag_id = db.Column(db.Integer, db.ForeignKey("default_tags.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey("templates.id", onupdate="CASCADE", ondelete="CASCADE"), nullable=False)

    default_tags = db.relationship("Default_Tag", back_populates="template_default_tags")
    templates = db.relationship("Template", back_populates="template_default_tags")
