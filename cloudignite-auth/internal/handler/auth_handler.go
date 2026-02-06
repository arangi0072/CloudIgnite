package handler

import (
	"fmt"
	"net/http"
	"strings"

	"cloudignite-auth/internal/service"

	"github.com/gin-gonic/gin"
)

type AuthRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Signup(c *gin.Context) {

	var req AuthRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	id, err := service.Signup(req.Email, req.Password)

	if err != nil {
		if strings.Contains(err.Error(), "duplicate") {
			c.JSON(409, gin.H{"error": "email already exists"})
			return
		}

		fmt.Println("SIGNUP ERROR:", err)
		c.JSON(500, gin.H{"error": "server error"})
		return
	}

	c.JSON(201, gin.H{
		"user_id": id,
	})
}

func Login(c *gin.Context) {

	var req AuthRequest

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid request"})
		return
	}

	token, err := service.Login(req.Email, req.Password)

	if err != nil {
		c.JSON(401, gin.H{"error": "invalid credentials"})
		return
	}

	c.JSON(200, gin.H{
		"token": token,
	})
}
