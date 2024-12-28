from flask import session
import json
import os
from sql_provider import SQLProvider
from DataBase.select import select_from_db

sql_provider = SQLProvider(os.path.join(os.path.dirname(__file__), 'sql'))

with open('DataBase/db_config.json') as f:
    db_config = json.load(f)

def authenticate(username, password):
    sql = select_from_db(db_config, sql_provider.get('auth.sql', login=username, password=password))
    if not sql:
        return {'error': 'Invalid login or password'}, 401
    sql = sql[0]
    session['login'] = username
    session['user_id'] = sql['user_id']
    session['user_group'] = sql['user_group']
    return {'ok': True}
