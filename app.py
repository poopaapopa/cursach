from flask import url_for, Flask, redirect, session
from auth.routes import auth_blueprint
from auth.acess import login_required
from search.main_page import park_blueprint
from manager.route_manager import route_manager_blueprint
from report.report import report_creation

app = Flask(__name__)
app.register_blueprint(auth_blueprint, url_prefix=('/auth'))
app.register_blueprint(park_blueprint, url_prefix=('/trolleybuspark'))
app.register_blueprint(route_manager_blueprint, url_prefix=('/route_manager'))
app.register_blueprint(report_creation, url_prefix=('/report_creation'))
app.secret_key = 'you_will_never_guess'

@app.route('/')
@login_required
def start():
    return redirect(url_for('park_bp.trolleybuspark_get'))

@app.route("/logout")
@login_required
def exit():
    session.clear()
    return redirect("/")

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)
