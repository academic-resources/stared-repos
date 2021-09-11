from flask import Blueprint
from flask_login import current_user
from app.models import Category

category_routes= Blueprint('category', __name__)


@category_routes.route("")
def get_categories():
    user_categories = Category.query.filter_by(user_id=current_user.id)
    default_categories = Category.query.filter_by(user_id=None)

    return {
        "defaultCategories": [default_category.to_dict()
                               for default_category
                               in default_categories],
        "userCategories": [user_category.to_dict()
                            for user_category
                            in user_categories]
           }
