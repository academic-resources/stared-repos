SELECT ad_id,
    ROUND(IFNULL(100* SUM(clicked)/SUM(clicked_viewed), 0), 2) AS ctr
    FROM
    (SELECT
        *,
        CASE WHEN action = 'Clicked' THEN 1 ELSE 0 END AS clicked,
        CASE WHEN action IN ('Clicked', 'Viewed') THEN 1 ELSE 0 END AS clicked_viewed
    FROM Ads) AS temp
GROUP BY ad_id
ORDER BY ctr DESC, ad_id