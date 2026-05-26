package service

import (
	"auth-service/internal/repository"
	"auth-service/internal/utils"
)

func AdminCreateUser(projectID, email, password string) error {

	hash, err := utils.HashPassword(password)
	if err != nil {
		return err
	}

	return repository.CreateUser(
		projectID,
		email,
		hash,
	)
}
