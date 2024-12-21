from flask import request, Blueprint, jsonify
import os
from DataBase.select import select_from_db
from sql_provider import SQLProvider
from auth.routes import db_config

sql_provider = SQLProvider(os.path.join(os.path.dirname(__file__), 'sql'))
pers_manager = Blueprint('pers_manager_bp', __name__, template_folder='templates')

@pers_manager.route('/', methods = ['POST'])
def report_post():
    input_data = request.form['date']
    [month, year] = input_data.split('.', 2)
    report_check = select_from_db(db_config, sql_provider.get('checkReport.sql', year=year[0:4], month=month))
    if request.method == 'POST':
        if not report_check:
            report_check = select_from_db(db_config, sql_provider.get('checkReport.sql', year=year[0:4], month=month),
                                          sql_provider.get('callReport.sql', month=month, year=year))
            return jsonify({'report': report_check})
        else:
            return jsonify({'report': report_check, 'month': month, 'year': year})
