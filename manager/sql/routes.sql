SELECT DATE_FORMAT(time_out,'%H:%i') time_out, DATE_FORMAT(time_in,'%H:%i') time_in,
       route_id, route_name, FIO as driver_name, serie, sh_id, driver_id,
       schedule.trolleybus_id
FROM trolleybuspark.schedule
JOIN trolleybuspark.trolleybus ON trolleybus.trolleybus_id = schedule.trolleybus_id
JOIN trolleybuspark.drivers ON driver_id = personnel_number
JOIN trolleybuspark.routes ON route_id = route
WHERE 1 = 1
AND YEAR(time_out) = '$year'
AND MONTH(time_out) = '$month'
AND DAY(time_out) = '$day'
ORDER BY time_out;