with temp AS (SELECT team_id, COUNT(employee_id) AS team_size
    FROM Employee
    GROUP BY team_id)

    SELECT employee_id, team_size
    FROM Employee e
    INNER JOIN temp
    ON e.team_id = temp.team_id