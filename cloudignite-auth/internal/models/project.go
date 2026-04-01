package models

import "time"

type Project struct {
	ID        string
	Name      string
	OwnerID   string
	Region    string
	CreatedAt time.Time
	Status    string
	DeletedAt *time.Time
}
