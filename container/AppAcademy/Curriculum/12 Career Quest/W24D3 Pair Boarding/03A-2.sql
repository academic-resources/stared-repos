-- Employees Query
-- In a SQL db, you have two tables, an employees table and a departments table. Employees belong to only one department. Write a SQL query that, given a department name, finds all the employees in that department.

SELECT
  employees.*
FROM
  employees e
JOIN
  departments d ON e.department_id = d.id
WHERE
  d.name = ?