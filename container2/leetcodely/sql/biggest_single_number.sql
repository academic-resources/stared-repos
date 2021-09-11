SELECT MAX(num) AS num
FROM
(SELECT num, count(num) AS occurence
FROM my_numbers
GROUP BY num) AS P
WHERE p.occurence = 1
