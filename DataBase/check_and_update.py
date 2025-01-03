from DataBase.connection import DBConnection
def check_and_update(db_config, check_request, update_request):
    with DBConnection(db_config) as cursor:
        cursor.execute(check_request)
        if cursor.rowcount == 0 or cursor.fetchone()[0] == 0:
            cursor.execute(update_request)
            cursor.close()
        else:
            cursor.close()
            return 0
        return 1
