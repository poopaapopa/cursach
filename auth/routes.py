from flask import Blueprint, render_template, request, session, redirect
import os
import json
from sql_provider import SQLProvider
from DataBase.select import select_from_db

auth_blueprint = Blueprint('auth_bp', __name__, template_folder='templates')
sql_provider = SQLProvider(os.path.join(os.path.dirname(__file__), 'sql'))

with open('DataBase/db_config.json') as f:
    db_config = json.load(f)

@auth_blueprint.route('/', methods=['GET', 'POST'])
def start_auth_handler():
    if request.method == 'GET':
        return render_template('authorization.html')
    else:
        login = request.form['login']
        password = request.form['password']
        sql = select_from_db(db_config, sql_provider.get('auth.sql', login=login, password=password))
        if not sql:
            session['logged_try'] = True
            return redirect('/auth')
        sql = sql[0]
        session['login'] = login
        session['user_id'] = sql['user_id']
        session['logged_try'] = False
        session['user_group'] = sql['user_group']
        return redirect("/")