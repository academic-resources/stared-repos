CREATE FUNCTION getNthHighestSalary(N INT) RETURNS INT
BEGIN
    RETURN(
        WITH temp AS(
            SELECT Id, Salary, DENSE_RANK() OVER(ORDER BY Salary DESC) AS rk
            FROM Employee
        )
        SELECT CASE WHEN N <= MAX(rk) THEN Salary ELSE NULL END
        FROM temp
        WHERE rk = N
        );
END