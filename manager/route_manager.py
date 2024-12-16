from flask import request, Blueprint, jsonify
from datetime import datetime
import os
from DataBase.connection import DBConnection
from DataBase.select import select_from_db
from sql_provider import SQLProvider
from auth.routes import db_config
from auth.acess import login_required

sql_provider = SQLProvider(os.path.join(os.path.dirname(__file__), 'sql'))
route_manager_blueprint = Blueprint('route_manager_bp', __name__, template_folder='templates')

@route_manager_blueprint.route("/", methods = ['POST', 'DELETE', 'PUT'])
@login_required
def trolleybuspark_get():
    if request.method == "POST":
        input_data = request.form

        route_id = input_data.get('route_id')
        trolleybus_id = input_data.get('trolleybus_id')
        driver_id = input_data.get('driver_id')
        day, month, year = input_data.get('day'), input_data.get('month'), input_data.get('year')
        time_out = input_data.get('time_out')
        time_in = input_data.get('time_in')
        time_out_full = datetime.strptime(f"{day}.{month}.{year} {time_out}", "%d.%m.%Y %H:%M").strftime("%Y-%m-%d %H:%M:%S")
        time_in_full = datetime.strptime(f"{day}.{month}.{year} {time_in}", "%d.%m.%Y %H:%M").strftime("%Y-%m-%d %H:%M:%S")

        with DBConnection(db_config) as cursor:
            cursor.execute(sql_provider.get('driver_check.sql',
                time_out=time_out_full,
                time_in=time_in_full,
                driver_id=driver_id
            ))
            if cursor.fetchone()[0] == 0:
                cursor.execute(sql_provider.get('new_route.sql',
                    time_out=time_out_full,
                    time_in=time_in_full,
                    route_id=route_id,
                    driver_id=driver_id,
                    trolleybus_id=trolleybus_id
                ))
                cursor.close()
            else:
                cursor.close()
                return jsonify({'report': 'error', 'message': 'Водитель уже занят в данное время.'})
        routes = select_from_db(db_config, sql_provider.get('routes.sql',  year=year[0:4], month=month, day=day))
        return jsonify({'routes': routes, 'status': 'ok'})
    elif request.method == "DELETE":
        sh_id = request.json['scheduleId']
        with DBConnection(db_config) as cursor:
            cursor.execute(sql_provider.get('route_delete.sql', sh_id=sh_id))
            if cursor.rowcount == 0:
                return jsonify({'status': 'error', 'message': 'Маршрут уже удалён или не найден'}), 404
            cursor.close()
        return jsonify({'status': 'ok'})