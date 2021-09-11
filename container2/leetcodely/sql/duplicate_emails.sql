SELECT Email
FROM
    (SELECT Email, count(Id) AS count
    FROM Person
    GROUP BY Email) AS temp
WHERE count > 1