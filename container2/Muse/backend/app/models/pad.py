from .db import db
import datetime


class Pad(db.Model):
    __tablename__ = 'pads'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(255), nullable=False)
    color = db.Column(db.String(64), default='#AFB1D4')
    multiplier = db.Column(db.Integer, default=1)

    block_seq = db.Column(db.ARRAY(db.Integer), nullable=False)
    note_seq = db.Column(db.ARRAY(db.String), nullable=False)
    date_created = db.Column(db.Date, default=datetime.datetime.today())

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    board_id = db.Column(db.Integer, db.ForeignKey(
        'boards.id'))

    user = db.relationship('User', back_populates='pads')
    board = db.relationship('Board', back_populates='pads')

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'color': self.color,
            'multiplier': self.multiplier,
            'block_seq': self.block_seq,
            'note_seq': self.note_seq,
            'user_id': self.user_id,
            'board_id': self.board_id,
            'date_created': self.date_created
        }
