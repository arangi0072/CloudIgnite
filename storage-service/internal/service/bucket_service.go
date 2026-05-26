package service

import (
	"context"
	"errors"
	"fmt"
	"strconv"
	"strings"

	"storage-service/internal/model"
	"storage-service/internal/repository"
	"storage-service/internal/storage"

	"github.com/google/uuid"
	"github.com/minio/minio-go/v7"
)

type BucketService struct {
	Repo *repository.BucketRepository
}

func (s *BucketService) GetBucket(projectID, name string) (*repository.Bucket, error) {
	return s.Repo.GetBucket(projectID, name)
}

func (s *BucketService) UpdateBucket(projectID, name string, quota *int64, isPublic *bool) error {
	return s.Repo.UpdateBucket(projectID, name, quota, isPublic)
}

func (s *BucketService) DeleteBucket(projectID, name string) error {

	bucket, err := s.Repo.GetBucket(projectID, name)
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

	return s.Repo.SoftDeleteBucket(bucket.ID)
}

func (s *BucketService) SetPolicy(bucketID uuid.UUID, policy model.Policy) error {
	if err := validatePolicy(policy); err != nil {
		return err
	}
	return s.Repo.SetBucketPolicy(bucketID, policy)
}

func (s *BucketService) GetPolicy(bucketID uuid.UUID) (*model.Policy, error) {
	return s.Repo.GetBucketPolicy(bucketID)
}

// --- validation ---

func validatePolicy(p model.Policy) error {
	if p.Version == "" {
		return errors.New("version required")
	}
	if len(p.Statements) == 0 {
		return errors.New("at least one statement required")
	}

	for i, st := range p.Statements {
		// effect
		if st.Effect != "allow" && st.Effect != "deny" {
			return errors.New("invalid effect in statement #" + itoa(i))
		}

		// actions
		if len(st.Actions) == 0 {
			return errors.New("actions required in statement #" + itoa(i))
		}
		for _, a := range st.Actions {
			if a != "read" && a != "write" {
				return errors.New("invalid action '" + a + "' in statement #" + itoa(i))
			}
		}

		// principal
		if st.Principal == "" {
			return errors.New("principal required in statement #" + itoa(i))
		}
		if !isValidPrincipal(st.Principal) {
			return errors.New("invalid principal in statement #" + itoa(i))
		}

		// resource (optional)
		if st.Resource != "" {
			if !isValidResource(st.Resource) {
				return errors.New("invalid resource in statement #" + itoa(i))
			}
		}
	}
	return nil
}

func isValidPrincipal(p string) bool {
	if p == "*" || p == "authenticated" || p == "user:*" {
		return true
	}
	if strings.HasPrefix(p, "user:") && len(strings.TrimPrefix(p, "user:")) > 0 {
		return true
	}
	return false
}

func isValidResource(r string) bool {
	// allow "*", "z/*", "z/file.txt", "path/{user_id}/*"
	if r == "*" {
		return true
	}
	// basic sanity: no spaces, no leading slash (optional rule), allow placeholders
	if strings.Contains(r, " ") {
		return false
	}
	// you can tighten this later with regex if needed
	return true
}

func itoa(i int) string {
	return strconv.Itoa(i)
}
