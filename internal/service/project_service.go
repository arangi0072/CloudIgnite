package service

import "cloudignite-auth/internal/repository"

func CreateProject(userID, name string) (string, error) {
	return repository.CreateProject(userID, name)
}

func GetProjects(userID string) interface{} {
	projects, _ := repository.GetUserProjects(userID)
	return projects
}
