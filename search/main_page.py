from flask import request, Blueprint
from auth.acess import login_required
from search.main_page_model import get_main_page

park_blueprint = Blueprint('park_bp', __name__, template_folder='templates')

@park_blueprint.route("/", methods = ['GET', 'POST'])
@login_required
def trolleybuspark_get():
    return get_main_page(request)
