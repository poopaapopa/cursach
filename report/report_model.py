from flask import jsonify, session
import os
import json
from DataBase.report_creation import rep_creation
from sql_provider import SQLProvider

sql_provider = SQLProvider(os.path.join(os.path.dirname(__file__), 'sql'))

with open('DataBase/db_config.json') as f:
    db_config = json.load(f)

def report_model(request):
    [month, year] = request.form['date'].split('.', 2)
    if session['user_group'] == 'pers_manager':
        report_check = rep_creation(db_config, sql_provider.get('call_drivers_report.sql', year=year[0:4], month=month),
                                    sql_provider.get('check_drivers_report.sql', month=month, year=year))
    else:
        report_check = rep_creation(db_config, sql_provider.get('call_routes_report.sql', year=year[0:4], month=month),
                                    sql_provider.get('check_routes_report.sql', month=month, year=year))
    if report_check.pop(0) == 1:
        return jsonify({'report': report_check})
    else:
        return jsonify({'report': report_check, 'month': month, 'year': year})