package repository

import (
	"context"
	"strings"

	"cloudignite-auth/internal/db"
	"cloudignite-auth/internal/models"
)

func CreateUser(email, hash string) (string, error) {

	query := `
	INSERT INTO users(email, password_hash)
	VALUES($1, $2)
	RETURNING id
	`

	var id string

	err := db.Pool.QueryRow(
		context.Background(),
		query,
		strings.ToLower(email),
		hash,
	).Scan(&id)

	return id, err
}

func GetUserByEmail(email string) (*models.User, error) {

	query := `
	SELECT id, email, password_hash
	FROM users
	WHERE email=$1
	`

	var user models.User

	err := db.Pool.QueryRow(
		context.Background(),
		query,
		strings.ToLower(email),
	).Scan(
		&user.ID,
		&user.Email,
		&user.PasswordHash,
	)

	if err != nil {
		return nil, err
	}

	return &user, nil
}
