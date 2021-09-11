import os
from flask import Flask, render_template, request, session
from flask_cors import CORS
from flask_migrate import Migrate
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_login import LoginManager

from .models import db, User
from .api.user_routes import user_routes
from .api.auth_routes import auth_routes
from .api.board_routes import board_routes

from .seeds import seed_commands

from .config import Config

app = Flask(__name__, static_folder='static', static_url_path='')

# Application Security
CORS(app)

# Setup login manager
login = LoginManager(app)
login.login_view = 'auth.unauthorized'


@login.user_loader
def load_user(id):
    return User.query.get(int(id))


# Tell flask about seed commands
app.cli.add_command(seed_commands)

app.config.from_object(Config)
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(auth_routes, url_prefix='/api/auth')
app.register_blueprint(board_routes, url_prefix='/api/board')
db.init_app(app)
Migrate(app, db)

api_v1_cors_config = {
    'origins': ['http://localhost:3000'],
    'methods': ['OPTIONS', 'GET', 'POST'],
    'allow_headers': ['Authorization', 'Content-Type'],
}


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
    return response

# app.config['CORS_HEADERS'] = 'application/json'
# app.use(function(req, res, next):
#         res.header("Access-Control-Allow-Origin", '*')
#         res.header("Access-Control-Allow-Credentials", true)
#         res.header('Access-Control-Allow-Methods',
#                    'GET,PUT,POST,DELETE,OPTIONS')
#         res.header("Access-Control-Allow-Headers",
#                    'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json')
#         next())


@app.after_request
def inject_csrf_token(response):
    response.set_cookie('csrf_token',
                        generate_csrf(),
                        secure=True if os.environ.get(
                            'FLASK_ENV') == 'production' else False,
                        samesite='Strict' if os.environ.get(
                            'FLASK_ENV') == 'production' else None,
                        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')

# add path to sounds or make links to aws.
