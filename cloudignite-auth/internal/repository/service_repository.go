package repository

import (
	"cloudignite-auth/internal/db"
	"context"
)

type ServiceJob struct {
	ID        string
	Type      string
	ProjectID string
}

func CreateService(projectID, serviceType string) (string, error) {

	var id string

	err := db.Pool.QueryRow(context.Background(),
		`INSERT INTO services(project_id, type, status)
		 VALUES($1,$2,'provisioning')
		 RETURNING id`,
		projectID, serviceType,
	).Scan(&id)

	return id, err
}

func FetchProvisioningJobs(limit int) ([]ServiceJob, error) {

	tx, err := db.Pool.Begin(context.Background())
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(context.Background())

	rows, err := tx.Query(context.Background(),
		`SELECT id, type, project_id
		 FROM services
		 WHERE status='provisioning'
		 FOR UPDATE SKIP LOCKED
		 LIMIT $1`,
		limit,
	)

	if err != nil {
		return nil, err
	}

	var jobs []ServiceJob

	for rows.Next() {
		var j ServiceJob
		rows.Scan(&j.ID, &j.Type, &j.ProjectID)
		jobs = append(jobs, j)
	}

	tx.Commit(context.Background())

	return jobs, nil
}

func MarkServiceActive(id string) {
	db.Pool.Exec(context.Background(),
		`UPDATE services
		 SET status='active', last_error=NULL
		 WHERE id=$1`, id)
}

func MarkServiceFailed(id, reason string) {
	db.Pool.Exec(context.Background(),
		`UPDATE services
		 SET status='failed', last_error=$2
		 WHERE id=$1`,
		id, reason)
}
