-- SQL + ActiveRecord

-- (from InstaCart) Write the following queries in SQL and in Rails:

-- a. "count all users",
-- b. "count all active users (you define what active means)",
-- c. "count all users who visited the site within a certain time period".


-- Solution
-- a.
SELECT
  COUNT(*)
FROM
  users;

-- Active Record:
-- User.count


-- b. Here we assume that active is a column on the users table.
SELECT
  COUNT(*)
FROM
  users
WHERE
  users.active = true;

-- Active Record:
-- User.where(:active => "TRUE").count


-- c.
SELECT
  COUNT(*)
FROM
  users
WHERE
users.last_login BETWEEN time_period_start AND time_period_end ;

-- Active Record:
-- User.where(last_login: (time_period_start..time_period_end)).count