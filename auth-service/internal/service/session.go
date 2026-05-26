package service

import (
	"auth-service/internal/models"
	"auth-service/internal/repository"

	"github.com/google/uuid"
)

func ListSessions(userID, projectID uuid.UUID) ([]models.Session, error) {
	return repository.ListUserSessions(userID, projectID)
}

func RevokeSession(sessionID uuid.UUID) error {
	return repository.RevokeSession(sessionID.String())
}

func RevokeOtherSessions(userID, projectID, currentSessionID uuid.UUID) error {
	return repository.RevokeOtherSessions(userID, projectID, currentSessionID)
}
