SELECT COUNT(*) as conflict_count
FROM TrolleybusPark.Schedule
WHERE driver_id = '${driver_id}'
    AND ((time_in <= '${time_in}'
    AND time_in >= '${time_out}')
    OR (time_out <= '${time_in}'
    AND time_out >= '${time_out}'));