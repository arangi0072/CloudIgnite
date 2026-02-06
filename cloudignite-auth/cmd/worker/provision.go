package main

import (
	"cloudignite-auth/internal/repository"
	"errors"
	"os"
)

func provision(job repository.ServiceJob) error {

	switch job.Type {

	case "storage":
		return provisionStorage(job.ProjectID)

	case "smtp":
		return provisionSMTP(job.ProjectID)

	case "serverless":
		return provisionServerless(job.ProjectID)

	default:
		return errors.New("unknown service")
	}
}

func provisionStorage(projectID string) error {

	path := "./storage/prj_" + projectID

	return os.MkdirAll(path, 0755)
}

func provisionSMTP(projectID string) error {
	return os.MkdirAll("./smtp/"+projectID, 0755)
}

func provisionServerless(projectID string) error {
	return os.MkdirAll("./functions/"+projectID, 0755)
}
