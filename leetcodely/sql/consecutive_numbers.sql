WITH temp AS (SELECT num, lead(num, 1) over(order by id ) as next1, lead(num, 2) over(order by id) as next2 from Logs)

SELECT DISTINCT(num) as ConsecutiveNums
FROM temp
WHERE num = next1 and num = next2