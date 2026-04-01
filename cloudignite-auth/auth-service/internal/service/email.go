package service

import (
	"auth-service/internal/db"
	"auth-service/internal/models"
	"auth-service/internal/repository"
	"auth-service/internal/utils"
	"context"
	"errors"
	"fmt"
	"time"
)

func ResendVerification(userID, projectID, email string) error {

	raw, hash, err := utils.GenerateEmailToken()
	if err != nil {
		return err
	}

	expires := time.Now().Add(24 * time.Hour)

	err = repository.CreateEmailToken(
		userID,
		projectID,
		email,
		hash,
		"verify_email",
		expires,
	)

	if err != nil {
		return err
	}

	verificationLink := fmt.Sprintf(
		"https://auth.cloudignite.in/v1/auth/verify-email?token=%s",
		raw,
	)
	query := `
		INSERT INTO auth_verification_tokens
		(project_id, user_id, token_hash, type, expires_at, used, created_at)
		VALUES ($1, $2, $3, $4, $5, false, NOW())
	`

	_, err = db.AuthPool.Exec(context.Background(),
		query,
		projectID,
		userID,
		hash,
		"verify_email",
		expires,
	)

	if err != nil {
		fmt.Println("INSERT ERROR:", err)
		return err
	}

	fmt.Println("Token inserted successfully")

	return utils.SendEmail(email, "Verification", verificationLink)
}

func ChangeEmail(
	userID,
	projectID,
	newEmail string,
) error {

	raw, hash, err := utils.GenerateEmailToken()
	if err != nil {
		return err
	}

	expires := time.Now().Add(24 * time.Hour)

	err = repository.CreateEmailToken(
		userID,
		projectID,
		newEmail,
		hash,
		"change_email",
		expires,
	)

	if err != nil {
		return err
	}

	link := fmt.Sprintf(
		"https://api.cloudignite.in/v1/auth/email/confirm-change?token=%s",
		raw,
	)

	query := `
		INSERT INTO auth_verification_tokens
		(project_id, user_id, token_hash, type, expires_at, used, created_at)
		VALUES ($1, $2, $3, $4, $5, false, NOW())
	`

	_, err = db.AuthPool.Exec(context.Background(),
		query,
		projectID,
		userID,
		hash,
		"change_email",
		expires,
	)

	if err != nil {
		fmt.Println("INSERT ERROR:", err)
		return err
	}

	fmt.Println("Token inserted successfully")

	return utils.SendEmail(newEmail, "Email Change", link)
}

func ConfirmEmailChange(rawToken string) error {

	hash := utils.HashToken(rawToken)

	token, err := repository.GetEmailToken(hash)
	if err != nil {
		return err
	}

	if token.IsUsed {
		return errors.New("token already used")
	}

	if time.Now().After(token.ExpiresAt) {
		return errors.New("token expired")
	}

	err = repository.UpdateUserEmail(
		token.UserID.String(),
		token.Email,
	)

	if err != nil {
		return err
	}

	query := `
		UPDATE auth_verification_tokens
		SET used = true
		WHERE token_hash = $1
	`

	_, err = db.AuthPool.Exec(context.Background(), query, hash)

	if err != nil {
		fmt.Println("UPDATE ERROR:", err)
		return err
	}

	fmt.Println("Token marked as used")

	return repository.MarkEmailTokenUsed(hash)
}

func EmailStatus(userID string, projectID string) (*models.EmailStatus, error) {

	_, email, verified, err := repository.GetEmailUser(projectID, userID)
	if err != nil {
		return nil, err
	}

	return &models.EmailStatus{
		Email:    email,
		Verified: verified,
	}, nil
}
