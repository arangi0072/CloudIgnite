package handler

import (
	"cloudignite-auth/internal/repository"
	"cloudignite-auth/internal/service"
	"net/http"

	"github.com/gin-gonic/gin"
)

type ServiceRequest struct {
	Type string `json:"type" binding:"required"`
}

func CreateService(c *gin.Context) {

	userID := c.GetString("user_id")
	projectID := c.Param("id")

	// 🔥 OWNER ONLY — infra costs money
	isOwner, err := repository.IsProjectOwner(userID, projectID)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "failed to validate project", "err": err})
		return
	}

	if !isOwner {
		c.JSON(http.StatusForbidden,
			gin.H{"error": "owner required"})
		return
	}

	var req ServiceRequest

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"error": "invalid request"})
		return
	}

	id, err := service.CreateService(projectID, req.Type)
	if err != nil {

		switch err.Error() {

		case "invalid service type":
			c.JSON(http.StatusBadRequest,
				gin.H{"error": err.Error()})
			return

		case "service already exists":
			c.JSON(http.StatusConflict,
				gin.H{"error": err.Error()})
			return

		default:
			c.JSON(http.StatusInternalServerError,
				gin.H{"error": "could not create service"})
			return
		}
	}

	// ✅ CORRECT — async provisioning
	c.JSON(http.StatusAccepted, gin.H{
		"service_id": id,
		"status":     "provisioning",
	})
}

func ListServices(c *gin.Context) {

	projectID := c.Param("id")
	userID := c.GetString("user_id")

	services, err := repository.ListServices(projectID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "failed to list services", "err": err})
		return
	}

	c.JSON(http.StatusOK, services)
}

func GetService(c *gin.Context) {

	projectID := c.Param("id")
	serviceID := c.Param("service_id")
	userID := c.GetString("user_id")

	service, err := repository.GetService(projectID, serviceID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "failed to get service"})
		return
	}

	c.JSON(http.StatusOK, service)
}

func DeleteService(c *gin.Context) {

	projectID := c.Param("id")
	serviceID := c.Param("service_id")
	userID := c.GetString("user_id")

	deleted, err := repository.DeleteService(projectID, serviceID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "failed to delete service"})
		return
	}

	if !deleted {
		c.JSON(http.StatusNotFound,
			gin.H{"error": "service not found"})
		return
	}

	c.Status(http.StatusNoContent)
}

func RestoreService(c *gin.Context) {

	projectID := c.Param("id")
	serviceID := c.Param("service_id")
	userID := c.GetString("user_id")

	restored, err := repository.RestoreService(projectID, serviceID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "failed to restore service"})
		return
	}

	if !restored {
		c.JSON(http.StatusNotFound,
			gin.H{"error": "service not found"})
		return
	}

	c.Status(http.StatusNoContent)
}

func SuspendService(c *gin.Context) {

	projectID := c.Param("id")
	serviceID := c.Param("service_id")
	userID := c.GetString("user_id")

	suspended, err := repository.SuspendService(projectID, serviceID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "failed to suspend service"})
		return
	}

	if !suspended {
		c.JSON(http.StatusNotFound,
			gin.H{"error": "service not found"})
		return
	}

	c.Status(http.StatusNoContent)
}

func ResumeService(c *gin.Context) {

	projectID := c.Param("id")
	serviceID := c.Param("service_id")
	userID := c.GetString("user_id")

	resumed, err := repository.ResumeService(projectID, serviceID, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError,
			gin.H{"error": "failed to resume service"})
		return
	}

	if !resumed {
		c.JSON(http.StatusNotFound,
			gin.H{"error": "service not found"})
		return
	}

	c.Status(http.StatusNoContent)
}
