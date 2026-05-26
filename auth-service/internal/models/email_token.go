package models

import (
	"time"

	"github.com/google/uuid"
)

type EmailToken struct {
	ID        uuid.UUID `json:"id"`
	UserID    uuid.UUID `json:"user_id"`
	ProjectID uuid.UUID `json:"project_id"`

	Email string `json:"email"`

	TokenHash string `json:"-"`

	Type string `json:"type"` // verification | email_change

	ExpiresAt time.Time `json:"expires_at"`

	IsUsed bool `json:"is_used"`

	CreatedAt time.Time  `json:"created_at"`
	UsedAt    *time.Time `json:"used_at,omitempty"`
}

type EmailStatus struct {
	Email    string `json:"email"`
	Verified bool   `json:"verified"`
}
