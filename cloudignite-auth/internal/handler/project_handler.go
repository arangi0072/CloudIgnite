package handler

import (
	"net/http"

	"cloudignite-auth/internal/repository"
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

func GetProject(c *gin.Context) {
	projectID := c.Param("id")
	userID := c.GetString("user_id")

	project, err := repository.GetProject(projectID, userID)

	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.JSON(http.StatusOK, project)
}

func UpdateProject(c *gin.Context) {

	projectID := c.Param("id")
	userID := c.GetString("user_id")

	var input struct {
		Name   *string `json:"name"`
		Region *string `json:"region"`
	}

	if err := c.ShouldBindJSON(&input); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	updated, err := repository.UpdateProject(projectID, userID, *input.Name, *input.Region)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Update failed"})
		return
	}

	if !updated {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.Status(http.StatusNoContent)
}

func DeleteProject(c *gin.Context) {

	projectID := c.Param("id")
	userID := c.GetString("user_id")

	deleted, err := repository.DeleteProject(projectID, userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Delete failed"})
		return
	}

	if !deleted {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.Status(http.StatusNoContent)
}

func RestoreProject(c *gin.Context) {

	projectID := c.Param("id")
	userID := c.GetString("user_id")

	restored, err := repository.RestoreProject(projectID, userID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Restore failed"})
		return
	}

	if !restored {
		c.JSON(http.StatusNotFound, gin.H{"error": "Project not found"})
		return
	}

	c.Status(http.StatusNoContent)
}
