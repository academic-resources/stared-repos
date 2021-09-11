WITH temp AS 
    (SELECT CandidateId, COUNT(*) AS votes
    FROM Vote
    GROUP BY CandidateId
    )
SELECT Name
FROM Candidate 
LEFT JOIN temp
ON Candidate.Id = temp.CandidateId
ORDER BY votes DESC LIMIT 1