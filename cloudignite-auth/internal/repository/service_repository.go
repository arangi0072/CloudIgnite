package repository

import (
	"context"
	"errors"
	"time"

	"cloudignite-auth/internal/db"
	"cloudignite-auth/internal/models"
)

type ServiceJob struct {
	ID        string
	Type      string
	ProjectID string
}

func ctx() (context.Context, context.CancelFunc) {
	return context.WithTimeout(context.Background(), 5*time.Second)
}

//////////////////////////////////////////////////////
// OWNER CHECK
//////////////////////////////////////////////////////

func IsProjectOwner(userID, projectID string) (bool, error) {

	c, cancel := ctx()
	defer cancel()

	query := `
	SELECT EXISTS(
	    SELECT 1
	    FROM projects
	    WHERE id=$1
	    AND owner_id=$2
	)`

	var exists bool

	err := db.Pool.QueryRow(c, query, projectID, userID).
		Scan(&exists)

	return exists, err
}

//////////////////////////////////////////////////////
// DUPLICATE SERVICE CHECK
//////////////////////////////////////////////////////

func serviceExists(projectID, serviceType string) (bool, error) {

	c, cancel := ctx()
	defer cancel()

	query := `
	SELECT EXISTS(
	    SELECT 1
	    FROM services
	    WHERE project_id=$1
	    AND type=$2
	    AND status != 'deleted'
	)`

	var exists bool

	err := db.Pool.QueryRow(c, query,
		projectID, serviceType).
		Scan(&exists)

	return exists, err
}

//////////////////////////////////////////////////////
// CREATE SERVICE
//////////////////////////////////////////////////////

func CreateService(projectID, serviceType string) (string, error) {

	exists, err := serviceExists(projectID, serviceType)
	if err != nil {
		return "", err
	}

	if exists {
		return "", errors.New("service already exists")
	}

	c, cancel := ctx()
	defer cancel()

	var id string

	err = db.Pool.QueryRow(c,
		`INSERT INTO services(project_id, type, status)
		 VALUES($1,$2,'provisioning')
		 RETURNING id`,
		projectID, serviceType,
	).Scan(&id)

	return id, err
}

//////////////////////////////////////////////////////
// FETCH JOBS (Worker Safe)
//////////////////////////////////////////////////////

func FetchProvisioningJobs(limit int) ([]ServiceJob, error) {

	c, cancel := ctx()
	defer cancel()

	tx, err := db.Pool.Begin(c)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(c)

	rows, err := tx.Query(c,
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

		if err := rows.Scan(
			&j.ID,
			&j.Type,
			&j.ProjectID,
		); err != nil {
			return nil, err
		}

		jobs = append(jobs, j)
	}

	if err := tx.Commit(c); err != nil {
		return nil, err
	}

	return jobs, nil
}

//////////////////////////////////////////////////////
// FAILURE HANDLING
//////////////////////////////////////////////////////

func MarkServiceFailed(id, reason string) {

	ctx := context.Background()

	// retry if below threshold
	db.Pool.Exec(ctx,
		`UPDATE services
		 SET retry_count = retry_count + 1,
		     status = CASE
		         WHEN retry_count + 1 >= 5 THEN 'failed'
		         ELSE 'provisioning'
		     END,
		     last_error=$2
		 WHERE id=$1`,
		id, reason,
	)
}

func ListServices(projectID string, userID string) ([]models.Service, error) {

	// verify membership
	isOwner, err := IsProjectOwner(userID, projectID)
	if err != nil {
		return nil, err
	}

	if !isOwner {
		return nil, errors.New("forbidden")
	}

	rows, err := db.Pool.Query(context.Background(),
		`SELECT id, type, status
		 FROM services
		 WHERE project_id=$1 AND deleted_at IS NULL`,
		projectID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var services []models.Service

	for rows.Next() {
		var s models.Service
		rows.Scan(&s.ID, &s.Type, &s.Status)
		services = append(services, s)
	}

	return services, nil
}

func GetService(projectID string, serviceID string, userID string) (*models.Service, error) {

	var s models.Service

	// verify membership
	isOwner, err := IsProjectOwner(userID, projectID)
	if err != nil {
		return nil, err
	}

	if !isOwner {
		return nil, errors.New("forbidden")
	}

	err = db.Pool.QueryRow(context.Background(),
		`SELECT id, project_id, type, status
		 FROM services
		 WHERE id=$1 AND deleted_at IS NULL`,
		serviceID,
	).Scan(&s.ID, &s.ProjectID, &s.Type, &s.Status)

	if err != nil {
		return nil, err
	}

	return &s, nil
}

func DeleteService(projectID string, serviceID string, userID string) (bool, error) {

	// verify membership
	isOwner, err := IsProjectOwner(userID, projectID)
	if err != nil {
		return false, err
	}

	if !isOwner {
		return false, errors.New("forbidden")
	}

	_, err = db.Pool.Exec(context.Background(),
		`UPDATE services
		 SET deleted_at = NOW()
		 WHERE id=$1`,
		serviceID,
	)

	if err != nil {
		return false, err
	}

	return true, nil
}

func RestoreService(projectID string, serviceID string, userID string) (bool, error) {

	// verify membership
	isOwner, err := IsProjectOwner(userID, projectID)
	if err != nil {
		return false, err
	}

	if !isOwner {
		return false, errors.New("forbidden")
	}

	_, err = db.Pool.Exec(context.Background(),
		`UPDATE services
		 SET deleted_at = NULL
		 WHERE id=$1`,
		serviceID,
	)

	if err != nil {
		return false, err
	}

	return true, nil
}

func SuspendService(projectID string, serviceID string, userID string) (bool, error) {

	// verify membership
	isOwner, err := IsProjectOwner(userID, projectID)
	if err != nil {
		return false, err
	}

	if !isOwner {
		return false, errors.New("forbidden")
	}

	_, err = db.Pool.Exec(context.Background(),
		`UPDATE services SET status='suspended'
		 WHERE id=$1`,
		serviceID,
	)

	if err != nil {
		return false, err
	}

	return true, nil
}

func ResumeService(projectID string, serviceID string, userID string) (bool, error) {

	// verify membership
	isOwner, err := IsProjectOwner(userID, projectID)
	if err != nil {
		return false, err
	}

	if !isOwner {
		return false, errors.New("forbidden")
	}

	_, err = db.Pool.Exec(context.Background(),
		`UPDATE services SET status='active'
		 WHERE id=$1`,
		serviceID,
	)

	if err != nil {
		return false, err
	}

	return true, nil
}
