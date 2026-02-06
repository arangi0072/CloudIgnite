package service

import (
	"cloudignite-auth/internal/repository"
	"cloudignite-auth/internal/utils"
)

func CreateAPIKey(projectID, name string) (string, error) {

	raw, hash, err := utils.GenerateAPIKey()
	if err != nil {
		return "", err
	}

	err = repository.CreateAPIKey(projectID, hash, name)
	if err != nil {
		return "", err
	}

	// return RAW ONLY ONCE
	return raw, nil
}

func ListAPIKeys(projectID string) (interface{}, error) {
	return repository.GetProjectAPIKeys(projectID)
}

func RevokeAPIKey(keyID string) error {
	return repository.RevokeAPIKey(keyID)
}
