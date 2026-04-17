package repository

import (
	"context"
	"crypto/rsa"
	"errors"
	"log"
	"time"

	"auth-service/internal/db"

	"github.com/jackc/pgx/v5"
)

type Project struct {
	ID         string `json:"project_id"`
	PrivateKey *rsa.PrivateKey
	PublicKey  string `json:"-"`
	KeyID      string `json:"-"`
}

func GetProjectByPKHash(hash string) (*Project, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var p Project
	log.Println("Hash:", hash)

	err := db.AuthPool.QueryRow(ctx,
		`SELECT project_id, private_key, key_id
		FROM auth_projects
		WHERE publishable_key_hash=$1`,
		hash,
	).Scan(&p.ID, &p.PrivateKey, &p.KeyID)

	// println("err", err.Error())

	if err != nil {
		log.Println("Error:", err.Error())
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, errors.New("project not found")
		}

		return nil, err
	}

	return &p, nil

}

func GetProjectById(projectID string) (*Project, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var p Project
	log.Println("Hash:", projectID)

	err := db.AuthPool.QueryRow(ctx,
		`SELECT project_id, public_key, key_id
		FROM auth_projects
		WHERE project_id=$1`,
		projectID,
	).Scan(&p.ID, &p.PublicKey, &p.KeyID)

	// println("err", err.Error())

	if err != nil {
		log.Println("Error:", err.Error())
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, errors.New("project not found")
		}

		return nil, err
	}

	return &p, nil

}

//////////////////////////////////////////////////////
// USER
//////////////////////////////////////////////////////

func GetUser(projectID, email string) (*User, string, error) {

	var user User
	var pw string

	err := db.AuthPool.QueryRow(context.Background(),
		`SELECT id, email, password_hash, email_verified
		 FROM auth_users
		 WHERE project_id=$1 AND email=$2`,
		projectID, email,
	).Scan(&user.ID, &user.Email, &pw, &user.EmailVerified)

	return &user, pw, err
}

func UpdatePassword(userID, hash string) error {

	_, err := db.AuthPool.Exec(context.Background(),
		`UPDATE auth_users
		 SET password_hash=$2
		 WHERE id=$1`,
		userID,
		hash,
	)

	return err
}

func GetProjectBySecretHash(hash string) (*Project, error) {

	var p Project

	err := db.AuthPool.QueryRow(
		context.Background(),
		`SELECT project_id, private_key
		 FROM auth_projects
		 WHERE secret_key_hash=$1`,
		hash,
	).Scan(&p.ID, &p.PrivateKey)

	if err != nil {
		return nil, err
	}

	return &p, nil
}

func UpdateJWTSecret(projectID, secret string) error {

	_, err := db.AuthPool.Exec(context.Background(),
		`UPDATE auth_projects
		 SET jwt_secret=$2
		 WHERE project_id=$1`,
		projectID,
		secret,
	)

	return err

}

func UpdateProjectKeys(
	projectID string,
	privateKey string,
	publicKey string,
	keyID string,
) error {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	_, err := db.AuthPool.Exec(ctx, `
	UPDATE auth_projects
	SET private_key = $1,
	    public_key  = $2,
	    key_id      = $3
	WHERE project_id = $4
	`,
		privateKey,
		publicKey,
		keyID,
		projectID,
	)

	return err
}
