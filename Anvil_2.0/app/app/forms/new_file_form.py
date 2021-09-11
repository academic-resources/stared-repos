from flask_wtf import FlaskForm
from wtforms import StringField, TextField, IntegerField
from wtforms.validators import DataRequired


class NewFileForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    content = TextField('content')
    s3_url = StringField('s3_url')
    folder_id = IntegerField('folder_id', validators=[DataRequired()])
    file_type_id = TextField('file_type_id')
