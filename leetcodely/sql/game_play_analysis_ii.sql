SELECT player_id, device_id
FROM
    (SELECT player_id, MIN(device_id) AS device_id, MIN(event_date)
    FROM Activity
    GROUP BY player_id) AS temp