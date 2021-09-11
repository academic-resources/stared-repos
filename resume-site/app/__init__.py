from flask import Flask, render_template
from flask_bootstrap import Bootstrap
from .defaults import default_data

bootstrap = Bootstrap()

def create_app(data=default_data):
    """Function to create and return an application"""
    app = Flask(__name__)
    app.config['data'] = data
    bootstrap.init_app(app)

    from .main import main as blueprint
    app.register_blueprint(blueprint)

    return app
