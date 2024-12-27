from flask import request, Blueprint, jsonify, session
import os
from DataBase.report_creation import rep_creation
from sql_provider import SQLProvider
from auth.routes import db_config

sql_provider = SQLProvider(os.path.join(os.path.dirname(__file__), 'sql'))
report_creation = Blueprint('report_creation_bp', __name__, template_folder='templates')

@report_creation.route('/', methods = ['POST'])
def report_post():
    input_data = request.form['date']
    [month, year] = input_data.split('.', 2)
    if request.method == 'POST':
        if session['user_group'] == 'pers_manager':
            report_check = rep_creation(db_config,
                                        sql_provider.get('call_drivers_report.sql', year=year[0:4], month=month),
                                        sql_provider.get('check_drivers_report.sql', month=month, year=year))
        else:
            report_check = rep_creation(db_config,
                                        sql_provider.get('call_routes_report.sql', year=year[0:4], month=month),
                                        sql_provider.get('check_routes_report.sql', month=month, year=year))
        if report_check.pop(0) == 1:
            return jsonify({'report': report_check})
        else:
            return jsonify({'report': report_check, 'month': month, 'year': year})
