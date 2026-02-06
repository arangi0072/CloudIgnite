package repository

import (
	"context"

	"cloudignite-auth/internal/db"
)

func CreateAPIKey(projectID, hash, name string) error {

	_, err := db.Pool.Exec(context.Background(),
		`INSERT INTO api_keys(project_id, key_hash, name)
		 VALUES($1, $2, $3)`,
		projectID, hash, name,
	)

	return err
}

func GetProjectAPIKeys(projectID string) ([]map[string]interface{}, error) {

	rows, err := db.Pool.Query(context.Background(),
		`SELECT id, name, revoked, created_at
		 FROM api_keys
		 WHERE project_id=$1`,
		projectID,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var keys []map[string]interface{}

	for rows.Next() {

		var id, name string
		var revoked bool
		var created string

		rows.Scan(&id, &name, &revoked, &created)

		keys = append(keys, map[string]interface{}{
			"id":         id,
			"name":       name,
			"revoked":    revoked,
			"created_at": created,
		})
	}

	return keys, nil
}

func RevokeAPIKey(keyID string) error {

	_, err := db.Pool.Exec(context.Background(),
		`UPDATE api_keys
		 SET revoked=true
		 WHERE id=$1`,
		keyID,
	)

	return err
}
