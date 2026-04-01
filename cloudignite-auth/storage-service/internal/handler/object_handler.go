package handler

import (
	"io"

	"storage-service/internal/service"
	"storage-service/internal/utils"

	"github.com/gin-gonic/gin"
)

func UploadObject(c *gin.Context) {

	projectID := c.GetString("project_id")

	bucket := c.PostForm("bucket")
	key := c.PostForm("key")

	file, header, err := c.Request.FormFile("file")
	if err != nil {
		c.JSON(400, gin.H{"error": "file required"})
		return
	}

	filename := header.Filename

	finalKey := utils.ResolveObjectKey(key, filename)

	ct := header.Header.Get("Content-Type")

	err = service.UploadObject(
		projectID,
		bucket,
		finalKey,
		file,
		header.Size,
		ct,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"message": "uploaded",
		"key":     finalKey,
	})
}

func DeleteObject(c *gin.Context) {

	projectID := c.GetString("project_id")

	bucket := c.Query("bucket")
	key := c.Query("key")

	err := service.DeleteObject(projectID, bucket, key)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "deleted"})
}

func UpdateMetadata(c *gin.Context) {

	projectID := c.GetString("project_id")

	var req struct {
		Bucket      string `json:"bucket"`
		Key         string `json:"key"`
		ContentType string `json:"content_type"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid"})
		return
	}

	err := service.UpdateMetadata(projectID, req.Bucket, req.Key, req.ContentType)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "updated"})
}

func GetMetadata(c *gin.Context) {

	projectID := c.GetString("project_id")

	bucket := c.Query("bucket")
	key := c.Query("key")

	obj, err := service.GetMetadata(projectID, bucket, key)
	if err != nil {
		c.JSON(404, gin.H{"error": "not found"})
		return
	}

	c.JSON(200, obj)
}

func Download(c *gin.Context) {

	projectID := c.GetString("project_id")

	bucket := c.Query("bucket")
	key := c.Query("key")

	obj, err := service.DownloadStream(projectID, bucket, key)
	if err != nil {
		c.JSON(404, gin.H{"error": "not found"})
		return
	}

	c.Header("Content-Disposition", "inline")
	io.Copy(c.Writer, obj)
}
