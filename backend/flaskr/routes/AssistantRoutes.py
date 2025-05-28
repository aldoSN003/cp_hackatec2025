from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
from flaskr.utils.config import Config

assistant_bp = Blueprint('assistant_bp', __name__)


@assistant_bp.route('/', methods=['GET'])
@cross_origin(origins=Config.ROUTE)
def index():
    return jsonify({"success": "Assistant Service"}), 200
