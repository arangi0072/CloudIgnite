package repository

import (
	"context"
	"time"

	"storage-service/internal/db"

	"github.com/google/uuid"
)

type Object struct {
	ID          string
	Key         string
	Size        int64
	ContentType string
	CreatedAt   time.Time
}

func GetBucketInfo(projectID, name string) (string, int64, error) {

	var id string
	var quota int64

	err := db.StoragePool.QueryRow(context.Background(), `
	SELECT id, quota_bytes
	FROM buckets
	WHERE project_id=$1 AND id=$2 AND deleted_at IS NULL
	`, projectID, name).Scan(&id, &quota)

	return id, quota, err
}

func InsertObject(projectID, bucketID, key string, size int64, ct string) error {

	_, err := db.StoragePool.Exec(context.Background(), `
	INSERT INTO objects (
		id, bucket_id, key, size_bytes, etag, content_type, created_at
	)
	VALUES ($1,$2,$3,$4,$5,$6,$7)
	`,
		uuid.New(),
		bucketID,
		key,
		size,
		"",
		ct,
		time.Now(),
	)
	return err
}

func SoftDeleteObject(bucketID, key string) error {

	_, err := db.StoragePool.Exec(context.Background(), `
	UPDATE objects
	SET is_deleted=true, status='deleted'
	WHERE bucket_id=$1 AND key=$2
	`, bucketID, key)

	return err
}

func UpdateMetadata(bucketID, key string, ct string) error {

	_, err := db.StoragePool.Exec(context.Background(), `
	UPDATE objects
	SET content_type=$1, updated_at=now()
	WHERE bucket_id=$2 AND key=$3
	`, ct, bucketID, key)

	return err
}

func GetMetadata(bucketID, key string) (*Object, error) {

	var o Object

	err := db.StoragePool.QueryRow(context.Background(), `
	SELECT id,key,size_bytes,content_type,created_at
	FROM objects
	WHERE bucket_id=$1 AND key=$2 AND is_deleted=false
	`, bucketID, key).Scan(
		&o.ID,
		&o.Key,
		&o.Size,
		&o.ContentType,
		&o.CreatedAt,
	)

	return &o, err
}
