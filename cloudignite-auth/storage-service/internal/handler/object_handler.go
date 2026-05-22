package handler

import (
	"io"
	"net/http"

	"storage-service/internal/service"
	// "storage-service/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type ObjectHandler struct {
	Service *service.ObjectService
}

func (h *ObjectHandler) UpdateMetadata(c *gin.Context) {

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

	err := h.Service.UpdateMetadata(projectID, req.Bucket, req.Key, req.ContentType)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "updated"})
}

func (h *ObjectHandler) GetMetadata(c *gin.Context) {

	projectID := c.GetString("project_id")

	bucket := c.Query("bucket")
	key := c.Query("key")

	obj, err := h.Service.GetMetadata(projectID, bucket, key)
	if err != nil {
		c.JSON(404, gin.H{"error": "not found"})
		return
	}

	c.JSON(200, obj)
}

func (h *ObjectHandler) Download(c *gin.Context) {

	projectID := c.GetString("project_id")

	bucket := c.Query("bucket")
	key := c.Query("key")

	obj, err := h.Service.DownloadStream(projectID, bucket, key)
	if err != nil {
		c.JSON(404, gin.H{"error": "not found"})
		return
	}

	c.Header("Content-Disposition", "inline")
	io.Copy(c.Writer, obj)
}

func (h *ObjectHandler) ListObjects(c *gin.Context) {

	projectID := c.GetString("project_id")

	bucket := c.Query("bucket")
	prefix := c.DefaultQuery("prefix", "")

	result, err := h.Service.ListObjects(projectID, bucket, prefix)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, result)
}

func (h *ObjectHandler) InitUpload(c *gin.Context) {
	var req struct {
		Bucket      string `json:"bucket"`
		Key         string `json:"key"`
		ContentType string `json:"content_type"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	projectID := c.GetString("project_id")
	bucketID, err := uuid.Parse(req.Bucket)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// assume bucket lookup done elsewhere
	result, err := h.Service.InitUpload(bucketID, req.Bucket, req.Key, req.ContentType, projectID)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, result)
}

func (h *ObjectHandler) ConfirmUpload(c *gin.Context) {
	var req struct {
		ObjectID string `json:"object_id"`
	}

	c.ShouldBindJSON(&req)

	token := c.GetHeader("Upload-Token")

	result, err := h.Service.ConfirmUpload(req.ObjectID, token)
	if err != nil {
		c.JSON(403, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, result)
}

func (h *ObjectHandler) RenameObject(c *gin.Context) {

	var req struct {
		Bucket string `json:"bucket"`
		OldKey string `json:"old_key"`
		NewKey string `json:"new_key"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid request"})
		return
	}

	err := h.Service.RenameObject(
		req.Bucket,
		req.OldKey,
		req.NewKey,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"message": "object renamed",
	})
}

func (h *ObjectHandler) DeleteObject(c *gin.Context) {

	bucket := c.Query("bucket")
	key := c.Query("key")

	err := h.Service.DeleteObject(bucket, key)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"message": "object deleted",
	})
}

func (h *ObjectHandler) DeleteMultipleObjects(c *gin.Context) {

	var req struct {
		Bucket string   `json:"bucket"`
		Keys   []string `json:"keys"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid request"})
		return
	}

	err := h.Service.DeleteMultipleObjects(
		req.Bucket,
		req.Keys,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"message": "objects deleted",
	})
}

func (h *ObjectHandler) GetObjectVersions(c *gin.Context) {

	bucket := c.Query("bucket")
	key := c.Query("key")

	versions, err := h.Service.GetObjectVersions(
		bucket,
		key,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"versions": versions,
	})
}

// func (h *ObjectHandler) DownloadObject(c *gin.Context) {

// 	token := c.Param("token")

// 	signed, err := h.Service.ValidateSignedURL(token)
// 	if err != nil {
// 		c.JSON(403, gin.H{"error":"invalid token"})
// 		return
// 	}

// 	// metrics
// 	// audit logs
// 	// bandwidth accounting
// 	// middleware
// 	// abuse detection

// 	reader, object, err := h.Service.GetObjectStream(
// 		signed.ObjectID,
// 	)

// 	if err != nil {
// 		c.JSON(500, gin.H{"error":"download failed"})
// 		return
// 	}

// 	c.Header(
// 		"Content-Disposition",
// 		"attachment; filename=\""+object.Key+"\"",
// 	)

// 	c.Header(
// 		"Content-Type",
// 		object.ContentType,
// 	)

// 	c.Header(
// 		"Content-Length",
// 		fmt.Sprintf("%d", object.Size),
// 	)

// 	io.Copy(c.Writer, reader)
// }

func (h *ObjectHandler) GenerateDownloadLink(
	c *gin.Context,
) {

	var req struct {
		Bucket string `json:"bucket"`
		Key    string `json:"key"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{
			"error": "invalid request",
		})
		return
	}

	url, err := h.Service.GenerateDownloadURL(
		req.Bucket,
		req.Key,
	)

	if err != nil {
		c.JSON(500, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(200, gin.H{
		"url": url,
	})
}
