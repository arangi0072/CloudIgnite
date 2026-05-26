package handler

import (
	"auth-service/internal/repository"
	"auth-service/internal/service"

	"github.com/gin-gonic/gin"
)

func ResendVerification(c *gin.Context) {

	userID := c.MustGet("user_id").(string)
	project := c.MustGet("project").(*repository.Project)
	email := c.MustGet("email").(string)

	err := service.ResendVerification(
		userID,
		project.ID,
		email,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "verification sent"})
}

func ChangeEmail(c *gin.Context) {

	var req struct {
		NewEmail string `json:"new_email"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "invalid request"})
		return
	}

	userID := c.MustGet("user_id").(string)
	projectID := c.MustGet("project_id").(string)

	err := service.ChangeEmail(
		userID,
		projectID,
		req.NewEmail,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "confirmation sent"})
}

func ConfirmChange(c *gin.Context) {

	token := c.Query("token")

	err := service.ConfirmEmailChange(token)

	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "email updated"})
}

func EmailStatus(c *gin.Context) {

	userID := c.MustGet("user_id").(string)
	projectID := c.MustGet("project_id").(string)

	status, err := service.EmailStatus(userID, projectID)

	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, status)
}
