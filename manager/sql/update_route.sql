UPDATE TrolleybusPark.Schedule
SET time_out = '$time_out',
    time_in = '$time_in',
    driver_id = '$driver_id',
    route_id = '$route_id',
    trolleybus_id = '$trolleybus_id'
WHERE sh_id = '$sh_id';