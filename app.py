from flask import url_for, Flask, redirect, session, render_template
from auth.routes import auth_blueprint
from auth.acess import login_required
from search_route.departures_page import park_blueprint

app = Flask(__name__)
app.register_blueprint(auth_blueprint, url_prefix=('/auth'))
app.register_blueprint(park_blueprint, url_prefix=('/trolleybuspark'))
app.secret_key = 'you_will_never_guess'

@app.route('/')
@login_required
def start():
    return redirect(url_for('park_bp.trolleybuspark_get', login=session.get('login')))

@app.route("/logout")
def exit():
    session.clear()
    return redirect("/")

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)