package handler

import (
	"auth-service/internal/repository"
	"auth-service/internal/service"

	"github.com/gin-gonic/gin"
)

func AdminCreateUser(c *gin.Context) {

	project := c.MustGet("project").(*repository.Project)

	var body struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(400, gin.H{"error": "invalid payload"})
		return
	}

	err := service.AdminCreateUser(
		project.ID,
		body.Email,
		body.Password,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(201, gin.H{"status": "user created"})
}

func AdminListUsers(c *gin.Context) {

	project := c.MustGet("project").(*repository.Project)

	users, err := repository.ListUsers(project.ID)
	if err != nil {
		c.JSON(500, gin.H{"error": "failed to fetch users"})
		return
	}

	c.JSON(200, users)
}

func AdminDeleteUser(c *gin.Context) {

	project := c.MustGet("project").(*repository.Project)
	userID := c.Param("id")

	err := repository.DeleteUser(
		project.ID,
		userID,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": "failed to delete"})
		return
	}

	c.JSON(200, gin.H{"status": "user deleted"})
}

func AdminDisableUser(c *gin.Context) {

	project := c.MustGet("project").(*repository.Project)
	userID := c.Param("id")

	err := repository.DisableUser(
		project.ID,
		userID,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": "failed"})
		return
	}

	c.JSON(200, gin.H{"status": "user disabled"})
}

func AdminRevokeSessions(c *gin.Context) {

	project := c.MustGet("project").(*repository.Project)
	userID := c.Param("id")

	err := repository.RevokeAllSessions(
		project.ID,
		userID,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": "failed"})
		return
	}

	c.JSON(200, gin.H{"status": "sessions revoked"})
}
