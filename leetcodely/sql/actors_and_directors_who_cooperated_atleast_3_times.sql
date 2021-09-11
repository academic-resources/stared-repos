SELECT actor_id, director_id
FROM
    (SELECT actor_id, director_id, count(timestamp) AS cooperated
    FROM ActorDirector
    GROUP BY actor_id, director_id) AS temp
WHERE cooperated >= 3