-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT Product.ProductName, Category.CategoryName 
FROM Category, Product;
-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT Order.Id as OrderID, Shipper.CompanyName 
FROM Order 
JOIN Order.ShipVia=Shipper.Id 
WHERE Order.OrderDate< '2012-08-09';
-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT Product.ProductName, OrderDetail.Quantity
FROM Product
JOIN OrderDetail ON OrderDetail.ProductId=Product.Id
WHERE OrderDetail.OrderId='10251'
ORDER BY Product.ProductName;
-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT Customer.CompanyName, Employee.LastName, Order.Id
FROM Order 
JOIN Employee ON Employee.Id=Order.EmployeeId
JOIN Customer ON Customer.Id=Order.CustomerId;

-- STRETCHES: 
-- Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.
SELECT DISTINCT Categories.CategoryName, (SELECT COUNT(*) FROM Products WHERE Products.CategoryID=Categories.CategoryID) as Count
FROM Products, Categories
ORDER BY Categories.CategoryName DESC;
-- Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.
SELECT DISTINCT Orders.OrderID, (SELECT SUM(Quantity) FROM OrderDetails WHERE OrderDetails.OrderID=Orders.OrderID) as ItemCount
FROM Orders, OrderDetails
ORDER BY Orders.OrderID DESC;