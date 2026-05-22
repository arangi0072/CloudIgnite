package repository

import (
	"context"
	"time"

	"storage-service/internal/db"
	"storage-service/internal/model"

	"github.com/google/uuid"
)

type SignedURLRepository struct{}

type ObjectRepository struct{}

type Object struct {
	ID          string
	Key         string
	Size        int64
	ContentType string
	CreatedAt   time.Time
}

func (r *ObjectRepository) GetBucketInfo(projectID, name string) (string, int64, error) {

	var id string
	var quota int64

	err := db.StoragePool.QueryRow(context.Background(), `
	SELECT id, quota_bytes
	FROM buckets
	WHERE project_id=$1 AND id=$2 AND deleted_at IS NULL
	`, projectID, name).Scan(&id, &quota)

	return id, quota, err
}

func (r *ObjectRepository) SoftDeleteObject(bucketID, key string) error {

	_, err := db.StoragePool.Exec(context.Background(), `
	UPDATE objects
	SET is_deleted=true, status='deleted'
	WHERE bucket_id=$1 AND key=$2
	`, bucketID, key)

	return err
}

func (r *ObjectRepository) UpdateMetadata(bucketID, key string, ct string) error {

	_, err := db.StoragePool.Exec(context.Background(), `
	UPDATE objects
	SET content_type=$1, updated_at=now()
	WHERE bucket_id=$2 AND key=$3
	`, ct, bucketID, key)

	return err
}

func (r *ObjectRepository) GetMetadata(bucketID, key string) (*Object, error) {

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

func (r *ObjectRepository) InsertObject(obj model.Object) error {
	query := `
        INSERT INTO objects (id, bucket_id, key, content_type, status)
        VALUES ($1, $2, $3, $4, $5)
    `
	_, err := db.StoragePool.Exec(context.Background(), query,
		obj.ID,
		obj.BucketID,
		obj.Key,
		obj.ContentType,
		obj.Status,
	)
	return err
}

func (r *ObjectRepository) GetObjectByID(id string) (*model.Object, error) {
	query := `SELECT id, bucket_id, key, status FROM objects WHERE id=$1`

	var obj model.Object
	err := db.StoragePool.QueryRow(context.Background(), query, id).Scan(
		&obj.ID,
		&obj.BucketID,
		&obj.Key,
		&obj.Status,
	)
	if err != nil {
		return nil, err
	}

	return &obj, nil
}

func (r *ObjectRepository) MarkObjectActive(id uuid.UUID, size int64, etag string) error {
	query := `
        UPDATE objects
        SET status='active',
            size_bytes=$1,
            etag=$2,
            updated_at=now()
        WHERE id=$3
    `
	_, err := db.StoragePool.Exec(context.Background(), query, size, etag, id)
	return err
}

func (r *ObjectRepository) RenameObject(bucketID, oldKey, newKey string) error {

	_, err := db.StoragePool.Exec(context.Background(), `
	UPDATE objects
	SET key=$1,
	    updated_at=now()
	WHERE bucket_id=$2
	  AND key=$3
	  AND is_deleted=false
	`,
		newKey,
		bucketID,
		oldKey,
	)

	return err
}

func (r *ObjectRepository) DeleteObject(
	bucketID,
	key string,
) error {

	_, err := db.StoragePool.Exec(context.Background(), `
	UPDATE objects
	SET is_deleted=true,
	    status='deleted',
	    updated_at=now()
	WHERE bucket_id=$1
	  AND key=$2
	  AND is_deleted=false
	`,
		bucketID,
		key,
	)

	return err
}

func (r *ObjectRepository) DeleteMultipleObjects(
	bucketID string,
	keys []string,
) error {

	_, err := db.StoragePool.Exec(context.Background(), `
	UPDATE objects
	SET is_deleted=true,
	    status='deleted',
	    updated_at=now()
	WHERE bucket_id=$1
	  AND key = ANY($2)
	  AND is_deleted=false
	`,
		bucketID,
		keys,
	)

	return err
}

func (r *ObjectRepository) CreateToken(
	objectID uuid.UUID,
	token string,
	urlType string,
	expires time.Time,
) error {

	_, err := db.StoragePool.Exec(context.Background(), `
	INSERT INTO signed_urls(
		object_id,
		token,
		type,
		expires_at
	)
	VALUES($1,$2,$3,$4)
	`,
		objectID,
		token,
		urlType,
		expires,
	)

	return err
}

func (r *ObjectRepository) GetToken(
	token string,
) (*model.SignedURL, error) {

	var s model.SignedURL

	err := db.StoragePool.QueryRow(context.Background(), `
	SELECT object_id,type,expires_at
	FROM signed_urls
	WHERE token=$1
	`, token).Scan(
		&s.ObjectID,
		&s.Type,
		&s.ExpiresAt,
	)

	return &s, err
}
