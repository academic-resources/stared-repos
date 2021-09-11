SELECT COUNT(player_id)
SElECT player_id,
       CASE WHEN datediff(event_date, next_event_date) <= 1 THEN 1 ELSE 0 AS valid_candidate
       FROM
        (SELECT player_id,
                event_date,
                lead(event_date) over(parition by player_id order by event_date) next_event_date
        FROM Activity)