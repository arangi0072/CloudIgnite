package service

import (
	"errors"
	"log"

	"cloudignite-auth/internal/repository"
)

var allowed = map[string]bool{
	"auth":       true,
	"storage":    true,
	"smtp":       true,
	"serverless": true,
}

func CreateService(projectID, serviceType string) (string, error) {
	log.Println("Creating service:", serviceType, projectID)

	if !allowed[serviceType] {
		log.Println("Invalid service type:", serviceType)
		return "", errors.New("invalid service type")
	}

	return repository.CreateService(projectID, serviceType)
}
