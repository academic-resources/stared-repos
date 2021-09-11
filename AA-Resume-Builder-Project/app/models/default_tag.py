from .db import db

class Default_Tag(db.Model):
    __tablename__ = "default_tags"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)

    template_default_tags = db.relationship("Template_Default_Tag", back_populates="default_tags", cascade="all, delete-orphan")
