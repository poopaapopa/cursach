from flask import Blueprint, render_template, request
from auth.auth_model import authenticate

auth_blueprint = Blueprint('auth_bp', __name__, template_folder='templates')

@auth_blueprint.route('/', methods=['GET', 'POST'])
def start_auth_handler():
    if request.method == 'GET':
        return render_template('authorization.html')
    else:
        login = request.form['login']
        password = request.form['password']
        return authenticate(login, password)
