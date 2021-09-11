from .db import db


class Category(db.Model):
    __tablename__ = "categories"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id",
                                                  onupdate="CASCADE",
                                                  ondelete="CASCADE"),
                        nullable=True)

    user = db.relationship("User", back_populates="category")
    folder = db.relationship("Folder", back_populates="category")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "user_id": self.user_id,
        }
