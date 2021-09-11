from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User
from sqlalchemy import desc

user_routes = Blueprint('users', __name__)


@user_routes.route('/')  # Get top 10 users
def users():
    users = User.query.order_by(
        desc(User.id)).limit(10).all()
    return {"users": [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')  # Get specific user
def user(id):
    user = User.query.get(id)
    user = user.to_dict()
    return user
