package handler

import (
	"cloudignite-auth/internal/repository"
	"cloudignite-auth/internal/service"

	"github.com/gin-gonic/gin"
)

type ServiceRequest struct {
	Type string `json:"type"`
}

func CreateService(c *gin.Context) {

	userID := c.GetString("user_id")
	projectID := c.Param("project_id")

	if !repository.UserHasProjectAccess(userID, projectID) {
		c.JSON(403, gin.H{"error": "forbidden"})
		return
	}

	var req ServiceRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid request"})
		return
	}

	id, err := service.CreateService(projectID, req.Type)
	if err != nil {
		c.JSON(500, gin.H{"error": "could not create service"})
		return
	}

	c.JSON(202, gin.H{
		"service_id": id,
		"status":     "provisioning",
	})
}
