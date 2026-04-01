package service

import (
	"context"
	"fmt"
	"mime/multipart"

	"storage-service/internal/repository"
	"storage-service/internal/storage"

	"github.com/minio/minio-go/v7"
)

func UploadObject(projectID, bucket, key string, file multipart.File, size int64, ct string) error {

	bucketID, _, err := repository.GetBucketInfo(projectID, bucket)
	if err != nil {
		return err
	}

	physical := fmt.Sprintf("ci-%s", projectID[:12])

	println("physical", physical)

	_, err = storage.Client.PutObject(
		context.Background(),
		physical,
		key,
		file,
		size,
		minio.PutObjectOptions{
			ContentType: ct,
		},
	)
	if err != nil {
		return err
	}

	return repository.InsertObject(projectID, bucketID, key, size, ct)
}

func DeleteObject(projectID, bucket, key string) error {

	bucketID, _, err := repository.GetBucketInfo(projectID, bucket)
	if err != nil {
		return err
	}

	physical := fmt.Sprintf("ci-%s-%s", projectID[:8], bucket)

	err = storage.Client.RemoveObject(
		context.Background(),
		physical,
		key,
		minio.RemoveObjectOptions{},
	)
	if err != nil {
		return err
	}

	return repository.SoftDeleteObject(bucketID, key)
}

func UpdateMetadata(projectID, bucket, key, ct string) error {

	bucketID, _, err := repository.GetBucketInfo(projectID, bucket)
	if err != nil {
		return err
	}

	return repository.UpdateMetadata(bucketID, key, ct)
}

func GetMetadata(projectID, bucket, key string) (*repository.Object, error) {

	bucketID, _, err := repository.GetBucketInfo(projectID, bucket)
	if err != nil {
		return nil, err
	}

	return repository.GetMetadata(bucketID, key)
}

func DownloadStream(projectID, bucket, key string) (*minio.Object, error) {

	physical := fmt.Sprintf("ci-%s", projectID[:12])

	return storage.Client.GetObject(
		context.Background(),
		physical,
		key,
		minio.GetObjectOptions{},
	)
}
