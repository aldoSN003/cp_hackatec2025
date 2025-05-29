from flask import Flask
from flask_cors import CORS
from flaskr.utils.config import Config
from flaskr.routes.AuthRoutes import auth_bp
from flaskr.routes.AssistantRoutes import assistant_bp
from flaskr.routes.ManagementRoutes import management_bp


def create_app():
    app = Flask(__name__)
    app.config["ROUTE"] = Config.ROUTE
    CORS(app, resources={r"/*": {"origins": Config.ROUTE}}, supports_credentials=True)
    #CORS(app, origins=["http://localhost:5173"])
    app.register_blueprint(management_bp, url_prefix='/management')
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(assistant_bp, url_prefix='/assistant')



    return app

