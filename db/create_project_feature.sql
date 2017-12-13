INSERT INTO project_feature(project_id, feature_data)
    VALUES ($1, $2)
;

SELECT * FROM project_feature
    WHERE project_id = $1