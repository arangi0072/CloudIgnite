package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"cloudignite-auth/internal/repository"
	"cloudignite-auth/internal/service"
)

//////////////////////////////////////////////////////
// LIST KEYS
//////////////////////////////////////////////////////

func ListKeys(c *gin.Context) {

	serviceID := c.Param("service_id")

	keys, err := repository.ListKeys(serviceID)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "failed to list keys"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"keys": keys,
	})
}

//////////////////////////////////////////////////////
// GET PUBLISHABLE
//////////////////////////////////////////////////////

func GetPublishableKey(c *gin.Context) {

	serviceID := c.Param("service_id")

	key, err := repository.GetPublishableKey(serviceID)
	if err != nil {
		c.JSON(http.StatusNotFound,
			gin.H{"error": "publishable key not found"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"publishable_key": key,
	})
}

//////////////////////////////////////////////////////
// ROTATE SECRET
//////////////////////////////////////////////////////

func RotateSecret(c *gin.Context) {

	serviceID := c.Param("service_id")

	secret, err := service.RotateSecret(serviceID)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "rotation failed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"secret_key": secret,
		"warning":    "Store this securely. It will not be shown again.",
	})
}

//////////////////////////////////////////////////////
// INITIAL SECRET
//////////////////////////////////////////////////////

func GetInitialSecret(c *gin.Context) {

	serviceID := c.Param("service_id")

	secret, err := service.GetInitialSecret(serviceID)
	if err != nil {
		c.JSON(http.StatusNotFound,
			gin.H{"error": "secret expired or already viewed"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"secret_key": secret,
	})
}

//////////////////////////////////////////////////////
// REVOKE
//////////////////////////////////////////////////////

func RevokeKey(c *gin.Context) {

	keyID := c.Param("key_id")

	err := repository.RevokeKey(keyID)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "failed to revoke"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "key revoked",
	})
}
