SELECT FIO, CONVERT(hour_count, SIGNED) as hour_count, rep_year, rep_month
FROM TrolleybusPark.report
JOIN TrolleybusPark.drivers ON drivers.personnel_number = report.Drivers_personnel_number
WHERE 1 = 1
AND rep_year = '$year'
AND rep_month = '$month';