use pitchmatch;
SELECT 
    s.id AS startup_id,
    s.name AS startup_name,
    i.id AS investor_id,
    i.name AS investor_name,
    
    (
        (s.industry_tags REGEXP i.preferred_industries) +
        (s.stage REGEXP i.preferred_stages) +
        (100000 BETWEEN i.ticket_size_min AND i.ticket_size_max)
    ) / 3 AS match_score

FROM 
    startups s
JOIN 
    investors i
WHERE
    (s.industry_tags REGEXP i.preferred_industries)
    OR (s.stage REGEXP i.preferred_stages)
    OR (100000 BETWEEN i.ticket_size_min AND i.ticket_size_max)
ORDER BY 
    match_score DESC;
