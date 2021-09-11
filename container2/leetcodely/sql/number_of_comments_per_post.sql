SELECT post_id, count(DISTINCT post_id, sub_id) AS 'number_of_comments' FROM
    (SELECT DISTINCT sub_id as post_id
    FROM Submissions
    WHERE parent_id is NULL) As T
LEFT JOIN Submissions AS s
ON T.post_id = s.parent_id
GROUP BY post_id;