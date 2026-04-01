package repository

import (
	"auth-service/internal/db"
	"context"
)

//////////////////////////////////////////////////////
// GET USER BY ID
//////////////////////////////////////////////////////

func GetUserByID(userID, projectID string) (*User, error) {

	var user User

	err := db.AuthPool.QueryRow(
		context.Background(),
		`SELECT id, email, created_at, email_verified, is_disabled
		 FROM auth_users
		 WHERE id=$1 AND project_id=$2`,
		userID,
		projectID,
	).Scan(
		&user.ID,
		&user.Email,
		&user.CreatedAt,
		&user.EmailVerified,
		&user.IsDisabled,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}

func MarkEmailVerified(userID string) error {

	_, err := db.AuthPool.Exec(context.Background(),
		`UPDATE auth_users
		 SET email_verified=true
		 WHERE id=$1`,
		userID,
	)

	return err
}
