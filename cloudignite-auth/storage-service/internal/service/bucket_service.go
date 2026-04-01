package service

import (
	"context"
	"fmt"

	"storage-service/internal/repository"
	"storage-service/internal/storage"

	"github.com/minio/minio-go/v7"
)

func GetBucket(projectID, name string) (*repository.Bucket, error) {
	return repository.GetBucket(projectID, name)
}

func UpdateBucket(projectID, name string, quota *int64, isPublic *bool) error {
	return repository.UpdateBucket(projectID, name, quota, isPublic)
}

func DeleteBucket(projectID, name string) error {

	bucket, err := repository.GetBucket(projectID, name)
	if err != nil {
		return err
	}

	physical := fmt.Sprintf("ci-%s-%s", projectID[:8], name)

	ctx := context.Background()

	objectCh := storage.Client.ListObjects(ctx, physical, minio.ListObjectsOptions{})

	for obj := range objectCh {
		if obj.Err != nil {
			return obj.Err
		}
		return fmt.Errorf("bucket not empty")
	}

	err = storage.Client.RemoveBucket(ctx, physical)
	if err != nil {
		return err
	}

	return repository.SoftDeleteBucket(bucket.ID)
}
