from flask import request, Blueprint
from report.report_model import report_model

report_creation = Blueprint('report_creation_bp', __name__, template_folder='templates')

@report_creation.route('/', methods = ['POST'])
def report_post():
    return report_model(request)
