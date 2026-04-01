package handler

import (
	"auth-service/internal/service"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func ListSessions(c *gin.Context) {

	userID := c.MustGet("user_id").(uuid.UUID)
	projectID := c.MustGet("project_id").(uuid.UUID)

	sessions, err := service.ListSessions(userID, projectID)
	if err != nil {
		c.JSON(500, gin.H{"error": "failed to fetch sessions"})
		return
	}

	c.JSON(200, gin.H{
		"sessions": sessions,
	})
}

func RevokeOtherSessions(c *gin.Context) {

	userID := c.MustGet("user_id").(uuid.UUID)
	projectID := c.MustGet("project_id").(uuid.UUID)
	currentSessionID := c.MustGet("session_id").(uuid.UUID)

	err := service.RevokeOtherSessions(
		userID,
		projectID,
		currentSessionID,
	)

	if err != nil {
		c.JSON(500, gin.H{"error": "failed to revoke sessions"})
		return
	}

	c.JSON(200, gin.H{
		"message": "other sessions revoked",
	})
}

func RevokeSession(c *gin.Context) {

	sessionID, _ := uuid.Parse(c.Param("id"))
	userID := c.MustGet("user_id").(uuid.UUID)

	err := service.RevokeSession(sessionID, userID)
	if err != nil {
		c.JSON(500, gin.H{"error": "failed to revoke session"})
		return
	}

	c.JSON(200, gin.H{
		"message": "session revoked",
	})
}
