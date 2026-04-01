package main

import (
	"errors"

	"cloudignite-auth/internal/repository"
)

func provision(job repository.ServiceJob) error {

	switch job.Type {

	case "auth":
		return provisionAuth(job.ID, job.ProjectID)

	case "storage":
		return provisionStorage(job.ID, job.ProjectID)

	// case "smtp":
	// 	return provisionSMTP(job.ProjectID)

	// case "serverless":
	// 	return provisionServerless(job.ProjectID)

	default:
		return errors.New("unknown service")
	}
}
