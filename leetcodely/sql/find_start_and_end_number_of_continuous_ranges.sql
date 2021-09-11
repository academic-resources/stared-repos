with temp as (
    select log_id, log_id - dense_rank() over (order by log_id) rnk
    from Logs
)
