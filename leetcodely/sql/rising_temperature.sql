SELECT Id FROM
    (SELECT w1.Id, w1.Temperature, w2.Temperature AS PreviousTemperature
    FROM Weather as w1
    JOIN Weather as W2
    ON DATEDIFF(w1.RecordDate, w2.RecordDate) = 1)
    as T
WHERE T.Temperature> T.PreviousTemperature;