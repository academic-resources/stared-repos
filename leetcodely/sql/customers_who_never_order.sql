SELECT Name AS Customers
FROM
    (SELECT name, count(o.Id) AS num_orders
    FROM Customers c
    LEFT JOIN Orders o
    ON c.Id = o.CustomerId
    GROUP BY c.name) AS x
WHERE num_orders = 0