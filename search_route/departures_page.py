from flask import render_template, request, Blueprint, session, jsonify
import os
from DataBase.select import select_from_db
from sql_provider import SQLProvider
from auth.routes import db_config
from auth.acess import login_required

sql_provider = SQLProvider(os.path.join(os.path.dirname(__file__), 'sql'))
park_blueprint = Blueprint('park_bp', __name__, template_folder='templates')

@park_blueprint.route("/<login>", methods = ['GET', 'POST'])
@login_required
def trolleybuspark_get(login):
    if session['user_group'] == 'pers_manager':
        if request.method == "GET":
            drivers = select_from_db(db_config, sql_provider.get('all_drivers.sql'))
            return render_template('personal.html', drivers=drivers, login=login)
        else:
            input_data = request.form
            drivers = select_from_db(db_config, sql_provider.get('drivers.sql', FIO=input_data['FIO']))
            return render_template('personal.html', drivers=drivers, login=login)
    else:
        if request.method == "GET":
            return render_template('user.html', login=login)
        else:
            input_data = request.form['date']
            [day, month, year] = input_data.split('.', 3)
            routes = select_from_db(db_config, sql_provider.get('routes.sql', year=year[0:4], month=month, day=day))
            return jsonify({'routes': routes})