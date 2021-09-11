from .db import db

class Template(db.Model):
    __tablename__ = 'templates'
    __table_args__ = {'extend_existing': True}
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(30), nullable=False)

    template_fields = db.relationship("Template_Field", back_populates="templates", cascade="all, delete-orphan")
    template_default_tags = db.relationship("Template_Default_Tag", back_populates="templates", cascade="all, delete-orphan")
