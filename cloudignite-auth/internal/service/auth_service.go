package service

import (
	"errors"

	"cloudignite-auth/internal/repository"
	"cloudignite-auth/internal/utils"
)

func Signup(email, password string) (string, error) {

	hash, err := utils.HashPassword(password)
	if err != nil {
		return "", err
	}

	id, err := repository.CreateUser(email, hash)
	if err != nil {
		return "", err
	}

	return id, nil
}

func Login(email, password string) (string, error) {

	user, err := repository.GetUserByEmail(email)
	if err != nil {
		return "", errors.New("invalid credentials")
	}

	if utils.CheckPassword(user.PasswordHash, password) != nil {
		return "", errors.New("invalid credentials")
	}

	return utils.GenerateJWT(user.ID)
}
