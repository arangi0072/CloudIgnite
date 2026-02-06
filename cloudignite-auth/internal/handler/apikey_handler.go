package handler

import (
	"cloudignite-auth/internal/repository"
	"cloudignite-auth/internal/service"

	"github.com/gin-gonic/gin"
)

type APIKeyRequest struct {
	Name string `json:"name"`
}

func CreateAPIKey(c *gin.Context) {

	userID := c.GetString("user_id")
	projectID := c.Param("project_id")

	if !repository.UserHasProjectAccess(userID, projectID) {
		c.JSON(403, gin.H{"error": "forbidden"})
		return
	}

	var req APIKeyRequest

	// if err := c.BindJSON(&req); err != nil {
	// 	c.JSON(400, gin.H{"error": "invalid request"})
	// 	return
	// }

	rawKey, err := service.CreateAPIKey(projectID, req.Name)
	if err != nil {
		c.JSON(500, gin.H{"error": "could not create key"})
		return
	}

	c.JSON(201, gin.H{
		"api_key": rawKey, // shown ONCE
	})
}

func ListAPIKeys(c *gin.Context) {

	userID := c.GetString("user_id")
	projectID := c.Param("project_id")

	if !repository.UserHasProjectAccess(userID, projectID) {
		c.JSON(403, gin.H{"error": "forbidden"})
		return
	}

	keys, _ := service.ListAPIKeys(projectID)

	c.JSON(200, keys)
}

func RevokeAPIKey(c *gin.Context) {

	keyID := c.Param("key_id")

	service.RevokeAPIKey(keyID)

	c.JSON(200, gin.H{
		"status": "revoked",
	})
}
