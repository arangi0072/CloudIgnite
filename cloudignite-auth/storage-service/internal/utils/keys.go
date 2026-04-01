package utils

import (
	"context"
	"errors"
	"strings"
	"time"

	"storage-service/internal/db"

	"github.com/jackc/pgx/v5"
)

func GetProjectByPKHash(hash string) (string, error) {

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	var ID string

	err := db.StoragePool.QueryRow(ctx,
		`SELECT project_id
		FROM storage_projects
		WHERE publishable_key_hash=$1`,
		hash,
	).Scan(&ID)

	if err != nil {

		if errors.Is(err, pgx.ErrNoRows) {
			return "", errors.New("project not found")
		}

		return "", err
	}

	return ID, nil

}

func GetProjectBySecretHash(hash string) (string, error) {

	var ID string

	err := db.StoragePool.QueryRow(
		context.Background(),
		`SELECT project_id
		 FROM storage_projects
		 WHERE secret_key_hash=$1`,
		hash,
	).Scan(&ID)

	if err != nil {
		return "", err
	}

	return ID, nil
}

func ResolveObjectKey(inputKey string, filename string) string {

	if inputKey == "" {
		return filename
	}

	// if key ends with "/" → treat as folder
	if strings.HasSuffix(inputKey, "/") {
		return inputKey + filename
	}

	// if key has no extension → treat as folder
	if !strings.Contains(strings.Split(inputKey, "/")[len(strings.Split(inputKey, "/"))-1], ".") {
		return inputKey + "/" + filename
	}

	// full key already
	return inputKey
}
