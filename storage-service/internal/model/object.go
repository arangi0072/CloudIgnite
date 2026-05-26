// internal/model/object.go
package model

import (
	"time"

	"github.com/google/uuid"
)

type Object struct {
	ID          uuid.UUID
	BucketID    uuid.UUID
	Key         string
	SizeBytes   int64
	ETag        string
	ContentType string
	Status      string
	CreatedAt   time.Time
}

type SignedURL struct {
	ID        uuid.UUID `db:"id"`
	ObjectID  uuid.UUID `db:"object_id"`
	Token     string    `db:"token"`
	Type      string    `db:"type"` // preview/download
	ExpiresAt time.Time `db:"expires_at"`
	CreatedBy *uuid.UUID `db:"created_by,omitempty"`
	CreatedAt time.Time `db:"created_at"`
}