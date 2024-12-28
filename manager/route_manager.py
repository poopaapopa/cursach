from flask import request, Blueprint
from manager.route_manager_model import route_manager_model

route_manager_blueprint = Blueprint('route_manager_bp', __name__, template_folder='templates')

@route_manager_blueprint.route("/", methods = ['POST', 'DELETE'])
def trolleybuspark_get():
    return route_manager_model(request)
