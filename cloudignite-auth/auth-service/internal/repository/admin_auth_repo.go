package repository

import (
	"context"
	"errors"
	"time"

	"auth-service/internal/db"

	"github.com/jackc/pgx/v5/pgconn"
)

type User struct {
	ID            string
	ProjectID     string
	Email         string
	IsDisabled    bool
	EmailVerified bool
	CreatedAt     time.Time
}

func CreateUser(projectID, email, hash string) error {

	ctx := context.Background()

	_, err := db.AuthPool.Exec(ctx,
		`INSERT INTO auth_users
		(project_id,email,password_hash)
		VALUES ($1,$2,$3)`,
		projectID, email, hash)

	if err != nil {

		if pgErr, ok := err.(*pgconn.PgError); ok {

			if pgErr.Code == "23505" {
				return errors.New("user already exists")
			}
		}

		return err
	}

	return err
}

func ListUsers(projectID string) ([]User, error) {

	rows, err := db.AuthPool.Query(context.Background(),
		`SELECT id, email, is_disabled, created_at
		 FROM auth_users
		 WHERE project_id=$1
		 ORDER BY created_at DESC`,
		projectID,
	)

	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []User

	for rows.Next() {

		var u User

		err := rows.Scan(
			&u.ID,
			&u.Email,
			&u.IsDisabled,
			&u.CreatedAt,
		)

		if err != nil {
			return nil, err
		}

		users = append(users, u)
	}

	return users, nil
}

func DeleteUser(projectID, userID string) error {

	_, err := db.AuthPool.Exec(context.Background(),
		`DELETE FROM auth_users
		 WHERE id=$1
		 AND project_id=$2`,
		userID,
		projectID,
	)

	return err
}

func DisableUser(projectID, userID string) error {

	_, err := db.AuthPool.Exec(context.Background(),
		`UPDATE auth_users
		 SET is_disabled=true
		 WHERE id=$1
		 AND project_id=$2`,
		userID,
		projectID,
	)

	return err
}

func RevokeAllSessions(projectID, userID string) error {

	_, err := db.AuthPool.Exec(context.Background(),
		`UPDATE auth_sessions
		 SET revoked=true
		 WHERE user_id=$1
		 AND project_id=$2`,
		userID,
		projectID,
	)

	return err
}
