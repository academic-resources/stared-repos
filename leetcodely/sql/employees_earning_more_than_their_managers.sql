SELECT Name AS Employee
FROM
    (SELECT a.Name, a.Salary, b.Salary AS manager_salary
    FROM Employee a
    JOIN Employee b
    ON a.ManagerId = b.Id) AS temp
WHERE salary > manager_salary