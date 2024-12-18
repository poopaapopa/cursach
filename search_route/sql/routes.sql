SELECT DATE_FORMAT(time_out,'%H:%i') time_out, DATE_FORMAT(time_in,'%H:%i') time_in,
       route_id, route_name, driver_id, trolleybus_id, sh_id
FROM trolleybuspark.schedule
JOIN trolleybuspark.routes ON route_id = route
WHERE 1 = 1
AND YEAR(time_out) = '$year'
AND MONTH(time_out) = '$month'
AND DAY(time_out) = '$day'
ORDER BY time_out;