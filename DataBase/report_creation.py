from DataBase.connection import DBConnection

def rep_creation(db_config, request, report):
    with DBConnection(db_config) as cursor:
        cursor.execute(report)
        output = []
        if cursor.rowcount == 0:
            cursor.execute(request)
            cursor.execute(report)
            output.append(1)
        else:
            output.append(0)
        result = cursor.fetchall()
        schema = [column[0] for column in cursor.description]
        for row in result:
            dict_row = dict(zip(schema, row))
            output.append(dict_row)
        cursor.close()
        return output