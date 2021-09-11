from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class EditFolderForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    category = IntegerField('category_id', validators=[DataRequired()])
