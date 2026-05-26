package handler

import (
	"net/http"
	"storage-service/internal/model"
	"storage-service/internal/service"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type BucketHandler struct {
	Service *service.BucketService
}

func (h *BucketHandler) GetBucket(c *gin.Context) {

	projectID := c.GetString("project_id")
	id := c.Param("bucket")

	bucket, err := h.Service.GetBucket(projectID, id)
	if err != nil {
		c.JSON(404, gin.H{"error": "bucket not found"})
		return
	}

	c.JSON(200, bucket)
}

func (h *BucketHandler) UpdateBucket(c *gin.Context) {

	projectID := c.GetString("project_id")
	id := c.Param("bucket")

	var req struct {
		QuotaBytes *int64 `json:"quota_bytes"`
		IsPublic   *bool  `json:"is_public"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid body"})
		return
	}

	err := h.Service.UpdateBucket(projectID, id, req.QuotaBytes, req.IsPublic)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "bucket updated"})
}

func (h *BucketHandler) DeleteBucket(c *gin.Context) {

	projectID := c.GetString("project_id")
	id := c.Param("bucket")

	err := h.Service.DeleteBucket(projectID, id)
	if err != nil {

		if err.Error() == "bucket not empty" {
			c.JSON(400, gin.H{"error": err.Error()})
			return
		}

		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "bucket deleted"})
}

type BucketLookup interface {
	GetBucketIDByName(bucketName, projectID string) (string, error)
}

// PUT /buckets/:bucket/policy
func (h *BucketHandler) SetBucketPolicy(c *gin.Context) {
	bucketName := c.Param("bucket")
	projectID := c.GetString("project_id")

	bucketIDStr, err := h.Service.GetBucket(projectID, bucketName)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "bucket not found"})
		return
	}

	var req model.Policy
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	bucketID, _ := uuid.Parse(bucketIDStr.ID)

	if err := h.Service.SetPolicy(bucketID, req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "policy set successfully",
	})
}

// GET /buckets/:bucket/policy
func (h *BucketHandler) GetBucketPolicy(c *gin.Context) {
	bucketName := c.Param("bucket")
	projectID := c.GetString("project_id")

	bucketIDStr, err := h.Service.GetBucket(projectID, bucketName)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "bucket not found"})
		return
	}

	bucketID, _ := uuid.Parse(bucketIDStr.ID)

	policy, err := h.Service.GetPolicy(bucketID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch policy"})
		return
	}

	if policy == nil {
		c.JSON(http.StatusOK, gin.H{
			"policy":  nil,
			"message": "no policy set (default = deny)",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"policy": policy,
	})
}
