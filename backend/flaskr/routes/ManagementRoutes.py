from flask import Blueprint, request, jsonify
from flask_cors import cross_origin
from flask_jwt_extended import jwt_required
from flaskr.utils.config import Config

management_bp = Blueprint('management_bp', __name__)


@management_bp.route('/', methods=['GET'])
@cross_origin(origins=Config.ROUTE)
def index():
    return jsonify({"success": "Management Service"}), 200
