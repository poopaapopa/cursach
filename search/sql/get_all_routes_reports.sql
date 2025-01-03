SELECT route_name, shifts_count, rep_year, rep_month, route_report.route_id
FROM TrolleybusPark.route_report
JOIN TrolleybusPark.routes ON routes.route = route_report.route_id
WHERE 1=1
    AND rep_year = '${year}';