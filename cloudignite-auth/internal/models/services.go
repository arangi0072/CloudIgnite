package models

import "time"

type Service struct {
	ID        string     `json:"id"`
	ProjectID string     `json:"projectId"`
	Type      string     `json:"type"`
	Status    string     `json:"status"`
	CreatedAt time.Time  `json:"createdAt"`
	DeletedAt *time.Time `json:"deletedAt,omitempty"`
}
