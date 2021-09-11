from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, TextField
from wtforms.validators import DataRequired


class EditFileForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    content = TextField('content')
    folder_id = IntegerField('folder_id', validators=[DataRequired()])
