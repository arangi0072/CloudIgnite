package handler

import (
	"storage-service/internal/service"

	"github.com/gin-gonic/gin"
)

func GetBucket(c *gin.Context) {

	projectID := c.GetString("project_id")
	id := c.Param("bucket")

	bucket, err := service.GetBucket(projectID, id)
	if err != nil {
		c.JSON(404, gin.H{"error": "bucket not found"})
		return
	}

	c.JSON(200, bucket)
}

func UpdateBucket(c *gin.Context) {

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

	err := service.UpdateBucket(projectID, id, req.QuotaBytes, req.IsPublic)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "bucket updated"})
}

func DeleteBucket(c *gin.Context) {

	projectID := c.GetString("project_id")
	id := c.Param("bucket")

	err := service.DeleteBucket(projectID, id)
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
