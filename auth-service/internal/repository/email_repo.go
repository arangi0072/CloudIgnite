package repository

import (
	"context"
	"time"

	"auth-service/internal/db"
	"auth-service/internal/models"

	"github.com/google/uuid"
)

func CreateEmailToken(
	userID,
	projectID,
	email,
	tokenHash,
	tokenType string,
	expiresAt time.Time,
) error {

	query := `
        INSERT INTO email_tokens
        (id, user_id, project_id, email, token_hash, type, expires_at)
        VALUES ($1,$2,$3,$4,$5,$6,$7)
    `

	_, err := db.AuthPool.Exec(context.Background(),
		query,
		uuid.New(),
		userID,
		projectID,
		email,
		tokenHash,
		tokenType,
		expiresAt,
	)

	return err
}

func GetEmailToken(tokenHash string) (*models.EmailToken, error) {

	query := `
        SELECT user_id, email, type, expires_at, is_used
        FROM email_tokens
        WHERE token_hash=$1
    `

	var t models.EmailToken

	err := db.AuthPool.QueryRow(context.Background(), query, tokenHash).
		Scan(
			&t.UserID,
			&t.Email,
			&t.Type,
			&t.ExpiresAt,
			&t.IsUsed,
		)

	if err != nil {
		return nil, err
	}

	return &t, nil
}

func MarkEmailTokenUsed(tokenHash string) error {

	_, err := db.AuthPool.Exec(context.Background(), `
        UPDATE email_tokens
        SET is_used=true, used_at=NOW()
        WHERE token_hash=$1
    `, tokenHash)

	return err
}

func UpdateUserEmail(userID, email string) error {

	_, err := db.AuthPool.Exec(context.Background(), `
        UPDATE users
        SET email=$1, email_verified=true
        WHERE id=$2
    `, email, userID)

	return err
}

func GetEmailUser(projectID, userID string) (string, string, bool, error) {

	var id, email string
	var email_verified bool

	err := db.AuthPool.QueryRow(context.Background(),
		`SELECT id,email, email_verified
		 FROM auth_users
		 WHERE project_id=$1 AND id=$2`,
		projectID, userID,
	).Scan(&id, &email, &email_verified)

	return id, email, email_verified, err
}
