package service

import "cloudignite-auth/internal/repository"

func CreateService(projectID, serviceType string) (string, error) {

	// Optional validation
	switch serviceType {
	case "storage", "smtp", "serverless":
	default:
		return "", nil
	}

	return repository.CreateService(projectID, serviceType)
}
