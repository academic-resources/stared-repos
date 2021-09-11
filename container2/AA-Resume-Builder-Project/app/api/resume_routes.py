from flask import Blueprint, jsonify, session, request, redirect
from app.models import User, db, Resume, Resume_Field, User_Resume_Tag, User_Tag
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy.orm import joinedload
from sqlalchemy import delete

resume_routes = Blueprint('resumes', __name__)


@resume_routes.route("/", methods=["GET"])
def get_resumes():
    current_user = int(session['_user_id'])
    resumes = Resume.query.options(joinedload(Resume.user_resume_tags).joinedload(
        User_Resume_Tag.user_tag)).filter(Resume.user_id == current_user).all()
    each_resume = {}
    count = 0
    for resume in range(0, len(resumes)):
        each_resume[count] = {
            "id": resumes[count].id,
            "html": resumes[count].html,
            "user_id": resumes[count].user_id,
            "style_id": resumes[count].style_id,
            "user_tags": []
        }

        for user_resume_tag in resumes[count].user_resume_tags:
            each_resume[count]["user_tags"].append(
                user_resume_tag.user_tag.name)

        count += 1

    return each_resume


@resume_routes.route('/<int:id>', methods=["GET"])
def get_resume(id):
    resume = Resume.query.get(id)
    single_resume = {
        "id": resume.id,
        "html": resume.html,
        "user_id": resume.user_id,
        "style_id": resume.style_id,
    }
    return single_resume


@resume_routes.route('/edit/<int:id>', methods=["GET"])
def edit_resume(id):

    resume = db.session.query(Resume).options(joinedload(
        Resume.user_resume_tags)).filter(Resume.id == id).first()

    resume_resume_info = {}

    field_tuples = sorted([(resume_field.page_order - 1, index) for index, resume_field in enumerate(resume.resume_fields)], key=lambda x:x[0])
    resume_resume_info = {"fields": [], "user_tags": [], "id": resume.id, "style": resume.style_id}
    for user_resume_tag in resume.user_resume_tags:
        resume_resume_info["user_tags"].append(user_resume_tag.user_tag.name)
    for pair in field_tuples:
        resume_resume_info["fields"].append({"name": resume.resume_fields[pair[1]].field.name, "placeholder": resume.resume_fields[pair[1]].field.placeholder, "field_id": resume.resume_fields[pair[1]].field.id, "value": resume.resume_fields[pair[1]].value})

    print(resume_resume_info)

    return resume_resume_info


@resume_routes.route('/save', methods=["POST"])
def save_resume():

    resumeData = request.json

    if resumeData["resume_id"] != "NEW":
        Resume.query.filter(Resume.id == resumeData["resume_id"]).delete()

    resume = Resume(
        html=resumeData["html"], user_id=resumeData["user_id"], style_id=resumeData["style_id"])

    db.session.add(resume)
    db.session.commit()
    db.session.flush()

    for tag in resumeData["user_tags"]:
        user_tag = User_Tag(user_id=resumeData["user_id"], name=tag)
        db.session.add(user_tag)
        db.session.commit()
        db.session.flush()
        user_resume_tag = User_Resume_Tag(
            user_tag_id=user_tag.id, resume_id=resume.id)
        db.session.add(user_resume_tag)

    for field in resumeData["fields"]:
        newField = Resume_Field(
            resume_id=resume.id, field_id=field["field_id"], page_order=field["page_order"], value=field["value"])
        db.session.add(newField)
        db.session.commit()
        db.session.flush()

    db.session.commit()

    return {"MESSAGE": "SUCCESSFULLY CREATED RESUME"}


@resume_routes.route('/delete/<int:id>', methods=["DELETE"])
def delete_resume(id):
    deleted_resume = Resume.query.get(id)
    db.session.delete(deleted_resume)
    db.session.commit()

    current_user = int(session['_user_id'])
    resumes = Resume.query.filter(Resume.user_id == current_user).all()
    each_resume = {}
    count = 0
    for resume in range(0, len(resumes)):
        each_resume[count] = {
            "id": resumes[count].id,
            "html": resumes[count].html,
            "user_id": resumes[count].user_id,
            "style_id": resumes[count].style_id,
        }
        count += 1

    return each_resume
