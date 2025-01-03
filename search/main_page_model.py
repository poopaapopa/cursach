from flask import session, render_template, jsonify
import os
import json
from datetime import datetime
from DataBase.select import select_from_db
from sql_provider import SQLProvider

sql_provider = SQLProvider(os.path.join(os.path.dirname(__file__), 'sql'))

with open('DataBase/db_config.json') as f:
    db_config = json.load(f)

def get_main_page(request):
    if session['user_group'] == 'pers_manager':
        if request.method == "GET":
            drivers = select_from_db(db_config, sql_provider.get('all_drivers.sql'))
            return render_template('personal.html', drivers=drivers, login=session['login'],
                                   user_group=session['user_group'])
        else:
            input_data = request.form
            drivers = select_from_db(db_config, sql_provider.get('drivers.sql', FIO=input_data['FIO']))
            return render_template('personal.html', drivers=drivers, login=session['login'],
                                   user_group=session['user_group'])
    elif session['user_group'] == 'admin':
        if request.method == "GET":
            year = 2024
            drivers_reports = select_from_db(db_config, sql_provider.get('get_all_drivers_reports.sql', year=year))
            routes_reports = select_from_db(db_config,sql_provider.get('get_all_routes_reports.sql', year=year))
            return render_template('boss.html', login=session['login'], drivers_reports=drivers_reports, routes_reports=routes_reports)
    else:
        if request.method == "GET":
            day = datetime.now().day
            month = datetime.now().month
            year = datetime.now().year
            all_routes, drivers, trolleybuses = [], [], []
            if session['user_group'] == 'routes_manager':
                all_routes = select_from_db(db_config, sql_provider.get('all_routes.sql'))
                drivers = select_from_db(db_config, sql_provider.get('all_drivers.sql'))
                trolleybuses = select_from_db(db_config, sql_provider.get('all_trolleybuses.sql'))
                routes = select_from_db(db_config,
                                        sql_provider.get('manager_routes.sql', year=year, month=month, day=day))
            else:
                routes = select_from_db(db_config, sql_provider.get('user_routes.sql', year=year, month=month, day=day))
            return render_template('user.html',
                                   login=session['login'], user_group=session['user_group'], routes=routes,
                                   year=year, month=month, day=day,
                                   all_routes=all_routes, drivers=drivers, trolleybuses=trolleybuses)
        else:
            input_data = request.form['date']
            if input_data == '':
                [day, month, year] = datetime.now().day, datetime.now().month, datetime.now().year
            else:
                try:
                    [day, month, year] = input_data.split('.', 3)
                    year = year[0:4]
                except:
                    [day, month, year] = datetime.now().day, datetime.now().month, datetime.now().year
            if session['user_group'] == 'routes_manager':
                routes = select_from_db(db_config, sql_provider.get('manager_routes.sql',
                                                                    year=year, month=month, day=day))
            else:
                routes = select_from_db(db_config, sql_provider.get('user_routes.sql',
                                                                    year=year, month=month, day=day))
            return jsonify({'routes': routes, 'year': year, 'month': month, 'day': day})
