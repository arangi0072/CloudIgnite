package repository

import (
	"context"
	"time"

	"storage-service/internal/db"
)

type Bucket struct {
	ID        string
	Name      string
	Region    string
	Quota     int64
	IsPublic  bool
	CreatedAt time.Time
}

func GetBucket(projectID, id string) (*Bucket, error) {

	var b Bucket

	err := db.StoragePool.QueryRow(
		context.Background(),
		`
		SELECT id, name, region, quota_bytes, is_public, created_at
		FROM buckets
		WHERE project_id=$1 AND id=$2 AND deleted_at IS NULL
		`,
		projectID,
		id,
	).Scan(
		&b.ID,
		&b.Name,
		&b.Region,
		&b.Quota,
		&b.IsPublic,
		&b.CreatedAt,
	)

	if err != nil {
		return nil, err
	}

	return &b, nil
}

func UpdateBucket(projectID, name string, quota *int64, isPublic *bool) error {

	query := "UPDATE buckets SET "
	args := []interface{}{}
	i := 1

	if quota != nil {
		query += "quota_bytes=$1,"
		args = append(args, *quota)
		i++
	}

	if isPublic != nil {
		query += "is_public=$" + string(rune(i+'0')) + ","
		args = append(args, *isPublic)
		i++
	}

	query += "updated_at=now() WHERE project_id=$" + string(rune(i+'0')) +
		" AND name=$" + string(rune(i+1+'0'))

	args = append(args, projectID, name)

	_, err := db.StoragePool.Exec(context.Background(), query, args...)

	return err
}

func SoftDeleteBucket(bucketID string) error {

	_, err := db.StoragePool.Exec(
		context.Background(),
		`
		UPDATE buckets
		SET deleted_at=now()
		WHERE id=$1
		`,
		bucketID,
	)

	return err
}
