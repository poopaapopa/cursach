SELECT route_name, CONVERT(hour_count, SIGNED) as hour_count, shifts_count, rep_year, rep_month
FROM TrolleybusPark.route_report
JOIN TrolleybusPark.routes ON routes.route = route_report.route_id
WHERE 1 = 1
AND rep_year = '$year'
AND rep_month = '$month';