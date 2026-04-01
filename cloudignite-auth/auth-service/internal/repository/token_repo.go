package repository

import (
	"auth-service/internal/db"
	"context"
	"time"
)

func CreateVerificationToken(
	projectID,
	userID,
	hash,
	tokenType string,
	expiry time.Time,
) error {

	_, err := db.AuthPool.Exec(context.Background(),
		`INSERT INTO auth_verification_tokens
		(project_id,user_id,token_hash,type,expires_at)
		VALUES ($1,$2,$3,$4,$5)`,
		projectID,
		userID,
		hash,
		tokenType,
		expiry,
	)

	return err
}

func GetToken(hash, tokenType string) (string, string, error) {

	var userID, projectID string

	println("hash", hash, "tokenType", tokenType)

	err := db.AuthPool.QueryRow(context.Background(),
		`SELECT user_id, project_id
		 FROM auth_verification_tokens
		 WHERE token_hash=$1
		 AND type=$2
		 AND used=false
		 AND expires_at > now()`,
		hash,
		tokenType,
	).Scan(&userID, &projectID)

	return userID, projectID, err
}

func MarkTokenUsed(hash string) {

	db.AuthPool.Exec(context.Background(),
		`UPDATE auth_verification_tokens
		 SET used=true
		 WHERE token_hash=$1`,
		hash)
}
