SELECT birthday, adres, employment_date, demission_date, FIO, personnel_number
FROM trolleybuspark.drivers
WHERE MATCH(FIO) AGAINST('$FIO');