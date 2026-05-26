package service

import (
	"context"
	"errors"
	"strings"
	"time"

	"storage-service/internal/model"
	"storage-service/internal/repository"
	"storage-service/internal/storage"
	"storage-service/internal/utils"

	"github.com/google/uuid"
	"github.com/minio/minio-go/v7"
)

type ObjectService struct {
	Repo *repository.ObjectRepository
}

func (s *ObjectService) UpdateMetadata(projectID, bucket, key, ct string) error {

	bucketID, _, err := s.Repo.GetBucketInfo(projectID, bucket)
	if err != nil {
		return err
	}

	return s.Repo.UpdateMetadata(bucketID, key, ct)
}

func (s *ObjectService) GetMetadata(projectID, bucket, key string) (*repository.Object, error) {

	bucketID, _, err := s.Repo.GetBucketInfo(projectID, bucket)
	if err != nil {
		return nil, err
	}

	return s.Repo.GetMetadata(bucketID, key)
}

func (s *ObjectService) ListObjects(projectID, bucket, prefix string) (map[string]interface{}, error) {

	ctx := context.Background()

	opts := minio.ListObjectsOptions{
		Prefix:    prefix,
		Recursive: false,
	}

	var folders []map[string]string
	var files []map[string]interface{}

	seenFolders := make(map[string]bool)

	for object := range storage.Client.ListObjects(ctx, bucket, opts) {

		if object.Err != nil {
			return nil, object.Err
		}

		key := object.Key

		// Remove prefix
		trimmed := strings.TrimPrefix(key, prefix)

		// Detect folder
		parts := strings.SplitN(trimmed, "/", 2)

		if len(parts) > 1 {
			folderName := parts[0] + "/"
			folderPath := prefix + folderName

			if !seenFolders[folderPath] {
				folders = append(folders, map[string]string{
					"name": folderName,
					"path": folderPath,
				})
				seenFolders[folderPath] = true
			}
			continue
		}

		// File
		files = append(files, map[string]interface{}{
			"name":          parts[0],
			"path":          key,
			"size":          object.Size,
			"last_modified": object.LastModified,
			// content_type optional (needs extra call if required)
		})
	}

	return map[string]interface{}{
		"prefix":  prefix,
		"folders": folders,
		"files":   files,
	}, nil
}

func (s *ObjectService) GetPresignedUploadURL(bucket, key string, expiry time.Duration) (string, error) {
	url, err := storage.Client.PresignedPutObject(
		context.Background(),
		bucket,
		key,
		expiry,
	)
	if err != nil {
		return "", err
	}
	return url.String(), nil
}

func (s *ObjectService) StatObject(bucket, key string) (minio.ObjectInfo, error) {
	return storage.Client.StatObject(context.Background(), bucket, key, minio.StatObjectOptions{})
}

func (s *ObjectService) InitUpload(bucketID uuid.UUID, bucketName, key, contentType, projectID string) (map[string]interface{}, error) {

	objectID := uuid.New()

	obj := model.Object{
		ID:          objectID,
		BucketID:    bucketID,
		Key:         key,
		ContentType: contentType,
		Status:      "pending",
	}

	if err := s.Repo.InsertObject(obj); err != nil {
		return nil, err
	}

	url, err := s.GetPresignedUploadURL(bucketName, key, 10*time.Minute)
	if err != nil {
		return nil, err
	}

	token, err := utils.GenerateUploadToken(objectID, projectID)
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"object_id":    objectID,
		"upload_url":   url,
		"upload_token": token,
	}, nil
}

func (s *ObjectService) ConfirmUpload(objectID, token string) (map[string]interface{}, error) {

	claims, err := utils.VerifyUploadToken(token)
	if err != nil {
		return nil, err
	}

	if claims["object_id"] != objectID {
		return nil, err
	}

	obj, err := s.Repo.GetObjectByID(objectID)
	if err != nil {
		return nil, err
	}

	stat, err := s.StatObject(obj.BucketID.String(), obj.Key)
	if err != nil {
		return nil, err
	}

	err = s.Repo.MarkObjectActive(obj.ID, stat.Size, stat.ETag)
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"size": stat.Size,
		"etag": stat.ETag,
	}, nil
}

func (s *ObjectService) RenameObject(bucket, oldKey, newKey string) error {

	// get bucket info
	bucketID, _, err := s.Repo.GetBucketInfo("", bucket)
	if err != nil {
		return err
	}

	// check old object exists
	_, err = s.Repo.GetMetadata(bucketID, oldKey)
	if err != nil {
		return err
	}

	// prevent overwrite
	_, err = s.Repo.GetMetadata(bucketID, newKey)
	if err == nil {
		return errors.New("object with new key already exists")
	}

	// rename in MinIO
	err = storage.RenameObject(bucket, oldKey, newKey)
	if err != nil {
		return err
	}

	// update DB
	err = s.Repo.RenameObject(bucketID, oldKey, newKey)
	if err != nil {

		// optional rollback attempt
		_ = storage.RenameObject(bucket, newKey, oldKey)

		return err
	}

	return nil
}

func (s *ObjectService) DeleteObject(
	bucket,
	key string,
) error {

	// TODO:
	// policy validation

	bucketID, _, err := s.Repo.GetBucketInfo("", bucket)
	if err != nil {
		return err
	}

	// check object exists
	_, err = s.Repo.GetMetadata(bucketID, key)
	if err != nil {
		return err
	}

	// delete from MinIO
	err = storage.DeleteObject(bucket, key)
	if err != nil {
		return err
	}

	// soft delete in DB
	return s.Repo.DeleteObject(bucketID, key)
}

func (s *ObjectService) DeleteMultipleObjects(
	bucket string,
	keys []string,
) error {

	bucketID, _, err := s.Repo.GetBucketInfo("", bucket)
	if err != nil {
		return err
	}

	// delete from MinIO
	err = storage.DeleteMultipleObjects(bucket, keys)
	if err != nil {
		return err
	}

	// soft delete in DB
	return s.Repo.DeleteMultipleObjects(bucketID, keys)
}

func (s *ObjectService) GetObjectVersions(
	bucket,
	key string,
) ([]minio.ObjectInfo, error) {

	return storage.GetObjectVersions(bucket, key)
}

const (
	minExpiry = 5 * time.Minute
	maxExpiry = 2 * time.Hour
)

func calculateDownloadExpiry(sizeBytes int64) time.Duration {

	const chunkSize = 100 * 1024 * 1024 // 100MB

	chunks := sizeBytes / chunkSize

	expiry := (time.Duration(chunks) * time.Minute) +
		(5 * time.Minute)

	if expiry < minExpiry {
		expiry = minExpiry
	}

	if expiry > maxExpiry {
		expiry = maxExpiry
	}

	return expiry
}

func (s *ObjectService) GeneratePreviewURL(
	projectID,
	bucket,
	key string,
) (string, error) {

	obj, err := s.Repo.GetObjectMetadata(
		projectID,
		bucket,
		key,
	)

	if err != nil {
		return "", err
	}

	// TODO:
	// policy validation
	// quota validation
	// billing validation

	expiry := calculateDownloadExpiry(
		obj.SizeBytes,
	)

	return storage.GeneratePreviewURL(
		bucket,
		key,
		expiry,
	)
}

func (s *ObjectService) GenerateDownloadURL(
	projectID,
	bucket,
	key string,
) (string, error) {

	obj, err := s.Repo.GetObjectMetadata(
		projectID,
		bucket,
		key,
	)

	if err != nil {
		return "", err
	}

	// TODO:
	// policy validation
	// quota validation
	// billing validation

	expiry := calculateDownloadExpiry(
		obj.SizeBytes,
	)

	return storage.GenerateDownloadURL(
		bucket,
		key,
		expiry,
	)
}

func (s *ObjectService) DownloadStream(
	projectID,
	bucket,
	key string,
) (
	*minio.Object,
	*repository.ObjectMetadata,
	error,
) {

	objMeta, err := s.Repo.GetObjectMetadata(
		projectID,
		bucket,
		key,
	)

	if err != nil {
		return nil, nil, err
	}

	// TODO:
	// policy validation
	// quota validation
	// billing validation

	obj, err := storage.DownloadStream(
		bucket,
		key,
	)

	if err != nil {
		return nil, nil, err
	}

	return obj, objMeta, nil
}
