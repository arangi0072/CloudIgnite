package storage

import (
	"context"
	"log"
	"net/url"
	"os"
	"time"

	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var Client *minio.Client

func InitMinio() {

	endpoint := os.Getenv("MINIO_ENDPOINT")

	accessKey := os.Getenv("MINIO_ACCESS_KEY")
	secretKey := os.Getenv("MINIO_SECRET_KEY")

	useSSL := false

	client, err := minio.New(endpoint, &minio.Options{
		Creds:  credentials.NewStaticV4(accessKey, secretKey, ""),
		Secure: useSSL,
	})

	if err != nil {
		log.Fatal(err)
	}

	Client = client

	log.Println("MinIO Connected")
}

func RenameObject(bucket, oldKey, newKey string) error {

	ctx := context.Background()

	// copy object
	src := minio.CopySrcOptions{
		Bucket: bucket,
		Object: oldKey,
	}

	dst := minio.CopyDestOptions{
		Bucket: bucket,
		Object: newKey,
	}

	_, err := Client.CopyObject(ctx, dst, src)
	if err != nil {
		return err
	}

	// delete old object
	err = Client.RemoveObject(
		ctx,
		bucket,
		oldKey,
		minio.RemoveObjectOptions{},
	)

	return err
}

func DeleteObject(bucket, key string) error {

	return Client.RemoveObject(
		context.Background(),
		bucket,
		key,
		minio.RemoveObjectOptions{},
	)
}

func DeleteMultipleObjects(bucket string, keys []string) error {

	ctx := context.Background()

	objectsCh := make(chan minio.ObjectInfo)

	go func() {
		defer close(objectsCh)

		for _, key := range keys {
			objectsCh <- minio.ObjectInfo{
				Key: key,
			}
		}
	}()

	for err := range Client.RemoveObjects(
		ctx,
		bucket,
		objectsCh,
		minio.RemoveObjectsOptions{},
	) {

		if err.Err != nil {
			return err.Err
		}
	}

	return nil
}

func GetObjectVersions(bucket, key string) ([]minio.ObjectInfo, error) {

	ctx := context.Background()

	var versions []minio.ObjectInfo

	objectCh := Client.ListObjects(
		ctx,
		bucket,
		minio.ListObjectsOptions{
			Prefix:       key,
			WithVersions: true,
			Recursive:    true,
		},
	)

	for obj := range objectCh {

		if obj.Err != nil {
			return nil, obj.Err
		}

		if obj.Key == key {
			versions = append(versions, obj)
		}
	}

	return versions, nil
}

func GeneratePreviewURL(
	bucket string,
	key string,
	expiry time.Duration,
) (string, error) {

	reqParams := make(url.Values)

	reqParams.Set(
		"response-content-disposition",
		"inline",
	)

	u, err := Client.PresignedGetObject(
		context.Background(),
		bucket,
		key,
		expiry,
		reqParams,
	)

	if err != nil {
		return "", err
	}

	return u.String(), nil
}

func GenerateDownloadURL(
	bucket string,
	key string,
	expiry time.Duration,
) (string, error) {

	reqParams := make(url.Values)

	reqParams.Set(
		"response-content-disposition",
		"attachment",
	)

	u, err := Client.PresignedGetObject(
		context.Background(),
		bucket,
		key,
		expiry,
		reqParams,
	)

	if err != nil {
		return "", err
	}

	return u.String(), nil
}

func DownloadStream(
	bucket string,
	key string,
) (*minio.Object, error) {

	obj, err := Client.GetObject(
		context.Background(),
		bucket,
		key,
		minio.GetObjectOptions{},
	)

	if err != nil {
		return nil, err
	}

	_, err = obj.Stat()
	if err != nil {
		return nil, err
	}

	return obj, nil
}
