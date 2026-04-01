package repository

import (
	"context"
	"errors"

	"auth-service/internal/db"
)

//////////////////////////////////////////////////////
// GET JWT SECRET
//////////////////////////////////////////////////////

func GetProjectJWTSecret(projectID string) (string, error) {

	var secret string

	err := db.AuthPool.QueryRow(
		context.Background(),
		`SELECT jwt_secret
		 FROM auth_projects
		 WHERE project_id=$1`,
		projectID,
	).Scan(&secret)

	if err != nil {
		return "", errors.New("project not found")
	}

	return secret, nil
}
