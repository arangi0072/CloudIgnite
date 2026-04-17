package service

import (
	"auth-service/internal/repository"
	"auth-service/internal/utils"
	"crypto/rsa"
	"crypto/sha256"
	"encoding/hex"
	"errors"
	"fmt"
	"time"
)

//////////////////////////////////////////////////////
// SIGNUP
//////////////////////////////////////////////////////

func Signup(projectID, email, password string) error {

	hash, err := utils.HashPassword(password)
	if err != nil {
		return err
	}

	return repository.CreateUser(projectID, email, hash)
}

//////////////////////////////////////////////////////
// LOGIN
//////////////////////////////////////////////////////

func Login(
	projectID,
	email,
	password,
	ip,
	userAgent string,
	privateKey *rsa.PrivateKey,
	keyID string,
) (string, string, *repository.User, error) {

	//////////////////////////////////////////////////
	// GET USER
	//////////////////////////////////////////////////

	user, passwordHash, err :=
		repository.GetUser(projectID, email)

	if err != nil {
		return "", "", nil, errors.New("invalid credentials")
	}

	err = utils.ComparePassword(passwordHash, password)
	if err != nil {
		return "", "", nil, errors.New("invalid credentials")
	}

	//////////////////////////////////////////////////
	// CREATE REFRESH TOKEN
	//////////////////////////////////////////////////

	refreshRaw, refreshHash, err :=
		utils.GenerateRefreshToken()

	if err != nil {
		return "", "", nil, err
	}

	err = repository.CreateSession(
		projectID,
		user.ID,
		refreshHash,
		email,
		ip,
		userAgent,
	)

	if err != nil {
		return "", "", nil, err
	}

	//////////////////////////////////////////////////
	// CREATE ACCESS TOKEN (RS256)
	//////////////////////////////////////////////////

	accessToken, err :=
		utils.GenerateAccessToken(
			user.ID,
			projectID,
			email,
			privateKey,
			keyID,
		)

	if err != nil {
		return "", "", nil, err
	}

	return accessToken, refreshRaw, user, nil
}

//////////////////////////////////////////////////////
// REFRESH TOKEN
//////////////////////////////////////////////////////

func RefreshToken(
	refreshRaw,
	ip,
	userAgent string,
	privateKey *rsa.PrivateKey,
	keyID string,
) (string, string, error) {

	hashBytes := sha256.Sum256([]byte(refreshRaw))
	hash := hex.EncodeToString(hashBytes[:])

	userID, projectID, email, err :=
		repository.GetSession(hash)

	if err != nil {
		return "", "", errors.New("invalid refresh token")
	}

	//////////////////////////////////////////////////
	// ROTATE TOKEN
	//////////////////////////////////////////////////

	repository.RevokeSession(hash, userID)

	newRaw, newHash, err :=
		utils.GenerateRefreshToken()

	if err != nil {
		return "", "", err
	}

	err = repository.CreateSession(
		projectID,
		userID,
		newHash,
		email,
		ip,
		userAgent,
	)

	if err != nil {
		return "", "", err
	}

	//////////////////////////////////////////////////
	// NEW ACCESS
	//////////////////////////////////////////////////

	accessToken, err :=
		utils.GenerateAccessToken(
			userID,
			projectID,
			email,
			privateKey,
			keyID,
		)

	if err != nil {
		return "", "", err
	}

	return accessToken, newRaw, nil
}

func LogoutAll(projectID, userID string) {

	repository.RevokeAll(projectID, userID)
}

func VerifyEmail(rawToken string) error {
	hashBytes := sha256.Sum256([]byte(rawToken))
	hash := hex.EncodeToString(hashBytes[:])

	userID, _, err :=
		repository.GetToken(hash, "verify_email")

	if err != nil {
		println("error", err.Error())
		return errors.New("invalid or expired token")
	}

	repository.MarkTokenUsed(hash)

	return repository.MarkEmailVerified(userID)
}

func ForgotPassword(projectID, email string) error {

	userID, _, err :=
		repository.GetUser(projectID, email)

	if err != nil {
		return nil // don't leak user existence
	}

	raw, hash, _ :=
		utils.GenerateSecureToken()

	repository.CreateVerificationToken(
		projectID,
		userID.ID,
		hash,
		"password_reset",
		time.Now().Add(1*time.Hour),
	)

	// send email HERE
	fmt.Println("RESET TOKEN:", raw)

	return nil
}

func ResetPassword(rawToken, newPassword string) error {

	hashBytes := sha256.Sum256([]byte(rawToken))
	hash := hex.EncodeToString(hashBytes[:])

	userID, projectID, err :=
		repository.GetToken(hash, "password_reset")

	if err != nil {
		return errors.New("invalid token")
	}

	pwHash, _ := utils.HashPassword(newPassword)

	err = repository.UpdatePassword(userID, pwHash)
	if err != nil {
		return err
	}

	repository.MarkTokenUsed(hash)

	// 🔥 CRITICAL SECURITY STEP
	repository.RevokeAll(projectID, userID)

	return nil
}
