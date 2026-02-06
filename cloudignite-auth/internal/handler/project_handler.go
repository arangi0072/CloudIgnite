package handler

import (
	"net/http"

	"cloudignite-auth/internal/service"

	"github.com/gin-gonic/gin"
)

type ProjectRequest struct {
	Name string `json:"name"`
}

func CreateProject(c *gin.Context) {

	userID := c.GetString("user_id")

	var req ProjectRequest

	if err := c.BindJSON(&req); err != nil || req.Name == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	projectID, err := service.CreateProject(userID, req.Name)

	if err != nil {
		c.JSON(500, gin.H{"error": "could not create project"})
		return
	}

	c.JSON(201, gin.H{
		"project_id": projectID,
	})
}

func ListProjects(c *gin.Context) {

	userID := c.GetString("user_id")

	projects := service.GetProjects(userID)

	c.JSON(200, projects)
}
