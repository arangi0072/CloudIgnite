package repository

import (
	"context"
	"errors"

	"cloudignite-auth/internal/db"
	"cloudignite-auth/internal/models"
)

func CreateProject(userID, name string) (string, error) {

	tx, err := db.Pool.Begin(context.Background())
	if err != nil {
		return "", err
	}
	defer tx.Rollback(context.Background())

	var projectID string

	err = tx.QueryRow(context.Background(),
		`INSERT INTO projects(owner_id, name)
		 VALUES($1, $2)
		 RETURNING id`,
		userID, name,
	).Scan(&projectID)

	if err != nil {
		return "", err
	}

	// create owner membership
	_, err = tx.Exec(context.Background(),
		`INSERT INTO memberships(user_id, project_id, role)
		 VALUES($1, $2, 'owner')`,
		userID, projectID,
	)

	if err != nil {
		return "", err
	}

	err = tx.Commit(context.Background())
	return projectID, err
}

func GetUserProjects(userID string) ([]models.Project, error) {

	rows, err := db.Pool.Query(context.Background(),
		`SELECT p.id, p.name, p.owner_id, p.region, p.created_at
		 FROM projects p
		 JOIN memberships m
		 ON p.id = m.project_id
		 WHERE m.user_id=$1`,
		userID,
	)

	if err != nil {
		return nil, err
	}

	defer rows.Close()

	var projects []models.Project

	for rows.Next() {
		var p models.Project

		if err := rows.Scan(
			&p.ID,
			&p.Name,
			&p.OwnerID,
			&p.Region,
			&p.CreatedAt,
		); err != nil {
			return nil, err
		}

		projects = append(projects, p)
	}

	return projects, nil
}

func GetProjectByID(projectID string) (*models.Project, error) {

	var p models.Project

	err := db.Pool.QueryRow(context.Background(),
		`SELECT id, name, owner_id, region, created_at
		 FROM projects
		 WHERE id=$1`,
		projectID,
	).Scan(
		&p.ID,
		&p.Name,
		&p.OwnerID,
		&p.Region,
		&p.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &p, nil
}

func UserHasProjectAccess(userID, projectID string) bool {

	var exists bool

	db.Pool.QueryRow(context.Background(),
		`SELECT EXISTS(
			SELECT 1
			FROM memberships
			WHERE user_id=$1 AND project_id=$2
		)`,
		userID, projectID,
	).Scan(&exists)

	return exists
}

func GetProject(projectID string, userID string) (*models.Project, error) {

	var project models.Project

	err := db.Pool.QueryRow(context.Background(),
		`SELECT id, name, owner_id, region, status, deleted_at
		 FROM projects
		 WHERE id=$1 AND deleted_at IS NULL`,
		projectID,
	).Scan(
		&project.ID,
		&project.Name,
		&project.OwnerID,
		&project.Region,
		&project.Status,
		&project.DeletedAt,
	)

	if err != nil {
		return nil, err
	}

	return &project, nil
}

func UpdateProject(projectID string, userID string, name string, region string) (bool, error) {

	// verify membership
	isOwner, err := IsProjectOwner(userID, projectID)
	if err != nil {
		return false, err
	}

	if !isOwner {
		return false, errors.New("forbidden")
	}

	_, err = db.Pool.Exec(context.Background(),
		`UPDATE projects
		 SET name = COALESCE($1, name),
		     region = COALESCE($2, region)
		 WHERE id=$3`,
		name,
		region,
		projectID,
	)

	if err != nil {
		return false, err
	}

	return true, nil
}

func DeleteProject(projectID string, userID string) (bool, error) {

	// verify membership
	isOwner, err := IsProjectOwner(userID, projectID)
	if err != nil {
		return false, err
	}

	if !isOwner {
		return false, errors.New("forbidden")
	}

	_, err = db.Pool.Exec(context.Background(),
		`UPDATE projects
		 SET deleted_at = NOW()
		 WHERE id=$1`,
		projectID,
	)

	if err != nil {
		return false, err
	}

	return true, nil
}

func RestoreProject(projectID string, userID string) (bool, error) {

	// verify membership
	isOwner, err := IsProjectOwner(userID, projectID)
	if err != nil {
		return false, err
	}

	if !isOwner {
		return false, errors.New("forbidden")
	}

	_, err = db.Pool.Exec(context.Background(),
		`UPDATE projects
		 SET deleted_at = NULL
		 WHERE id=$1`,
		projectID,
	)

	if err != nil {
		return false, err
	}

	return true, nil
}
