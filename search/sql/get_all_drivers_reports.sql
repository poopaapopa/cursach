SELECT FIO, hour_count, rep_year, rep_month, drivers.personnel_number
FROM TrolleybusPark.report
JOIN TrolleybusPark.drivers ON drivers.personnel_number = report.Drivers_personnel_number
WHERE 1=1
    AND rep_year = '${year}';