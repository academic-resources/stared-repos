from flask import Blueprint, jsonify, session, request
from app.models import Template, db, Template_Field, Field, Template_Default_Tag, Default_Tag, Style
from flask_login import login_required
from sqlalchemy.orm import joinedload

template_routes = Blueprint('templates', __name__)

@template_routes.route("/", methods=["GET"])
@login_required
def get_templates():
    templates = db.session.query(Template).join(Template.template_fields).options(joinedload(Template.template_fields).joinedload(Template_Field.field),joinedload(Template.template_default_tags).joinedload(Template_Default_Tag.default_tags)).order_by(Template_Field.page_order).all()

    template_resume_info = {}

    for template in templates:
        field_tuples = sorted([(template_field.page_order - 1, index) for index, template_field in enumerate(template.template_fields)], key=lambda x:x[0])
        template_resume_info[template.name] = {"field_data": [], "default_tags": []}
        for template_default_tag in template.template_default_tags:
            template_resume_info[template.name]["default_tags"].append(template_default_tag.default_tags.name)
        for pair in field_tuples:
            template_resume_info[template.name]["field_data"].append({"name":template.template_fields[pair[1]].field.name, "placeholder": template.template_fields[pair[1]].field.placeholder, "field_id": template.template_fields[pair[1]].field.id})
    return template_resume_info

@template_routes.route("/styles", methods=["GET"])
@login_required
def get_styles():
    styles = db.session.query(Style).all()

    styledData = {}

    for style in styles:
        styledData[style.id] = style.name

    return styledData
