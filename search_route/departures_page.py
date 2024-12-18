from flask import render_template, request, Blueprint, session, jsonify
import os
from DataBase.select import select_from_db
from sql_provider import SQLProvider
from datetime import datetime
from auth.routes import db_config
from auth.acess import login_required

sql_provider = SQLProvider(os.path.join(os.path.dirname(__file__), 'sql'))
park_blueprint = Blueprint('park_bp', __name__, template_folder='templates')

@park_blueprint.route("/", methods = ['GET', 'POST'])
@login_required
def trolleybuspark_get():
    if session['user_group'] == 'pers_manager':
        if request.method == "GET":
            drivers = select_from_db(db_config, sql_provider.get('all_drivers.sql'))
            return render_template('personal.html', drivers=drivers, login=session['login'])
        else:
            input_data = request.form
            drivers = select_from_db(db_config, sql_provider.get('drivers.sql', FIO=input_data['FIO']))
            return render_template('personal.html', drivers=drivers, login=session['login'])
    else:
        if request.method == "GET":
            day = datetime.now().day
            month = datetime.now().month
            year = datetime.now().year
            routes_id, drivers, trolleybuses = [], [], []
            if (session['user_group'] == 'routes_manager'):
                routes_id = select_from_db(db_config, sql_provider.get('all_routes_id.sql'))
                drivers = select_from_db(db_config, sql_provider.get('all_drivers.sql'))
                trolleybuses = select_from_db(db_config, sql_provider.get('all_trolleybuses.sql'))
            routes = select_from_db(db_config, sql_provider.get('routes.sql', year=year, month=month, day=day))
            return render_template('user.html',
                                   login=session['login'], user_group=session['user_group'], routes=routes,
                                   year=year, month=month, day=day,
                                   routes_id=routes_id, drivers=drivers, trolleybuses=trolleybuses)
        else:
            input_data = request.form['date']
            [day, month, year] = input_data.split('.', 3)
            year = year[0:4]
            if (session['user_group'] == 'routes_manager'):
                routes = select_from_db(db_config, sql_provider.get('manager_routes.sql',
                                                                    year=year, month=month, day=day))
            else:
                routes = select_from_db(db_config, sql_provider.get('user_routes.sql',
                                                                    year=year, month=month, day=day))
            return jsonify({'routes': routes, 'year': year, 'month': month, 'day': day})
