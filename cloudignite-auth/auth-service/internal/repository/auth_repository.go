package repository

import (
	"context"
	"errors"
	"log"
	"time"

	"auth-service/internal/db"

	"github.com/jackc/pgx/v5"
)

type Project struct {
	ID        string `json:"project_id"`
	JWTSecret string `json:"-"`
}

func GetProjectByPKHash(hash string) (*Project, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var p Project
	log.Println("Hash:", hash)

	err := db.AuthPool.QueryRow(ctx,
		`SELECT project_id, jwt_secret
		FROM auth_projects
		WHERE publishable_key_hash=$1`,
		hash,
	).Scan(&p.ID, &p.JWTSecret)

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

func GetUser(projectID, email string) (string, string, error) {

	var id, pw string

	err := db.AuthPool.QueryRow(context.Background(),
		`SELECT id,password_hash
		 FROM auth_users
		 WHERE project_id=$1 AND email=$2`,
		projectID, email,
	).Scan(&id, &pw)

	return id, pw, err
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
		`SELECT project_id, jwt_secret
		 FROM auth_projects
		 WHERE secret_key_hash=$1`,
		hash,
	).Scan(&p.ID, &p.JWTSecret)

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
