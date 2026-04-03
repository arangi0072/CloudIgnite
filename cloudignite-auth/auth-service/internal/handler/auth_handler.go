package handler

import (
	"auth-service/internal/repository"
	"auth-service/internal/service"
	"auth-service/internal/utils"
	"crypto/sha256"
	"encoding/hex"
	"net/http"

	"github.com/gin-gonic/gin"
)

//////////////////////////////////////////////////////
// SIGNUP
//////////////////////////////////////////////////////

func Signup(c *gin.Context) {

	project := c.MustGet("project").(*repository.Project)

	var body struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required,min=6"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"error": err.Error()})
		return
	}

	err := service.Signup(
		project.ID,
		body.Email,
		body.Password,
	)

	if err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated,
		gin.H{"status": "user created"})
}

//////////////////////////////////////////////////////
// LOGIN
//////////////////////////////////////////////////////

func Login(c *gin.Context) {

	project := c.MustGet("project").(*repository.Project)

	var body struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"error": err.Error()})
		return
	}

	ip := c.ClientIP()
	userAgent := c.Request.UserAgent()

	access, refresh, err := service.Login(
		project.ID,
		project.JWTSecret,
		body.Email,
		body.Password,
		ip,
		userAgent,
	)

	if err != nil {
		c.JSON(http.StatusUnauthorized,
			gin.H{"error": "invalid credentials", "err": err})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token":  access,
		"refresh_token": refresh,
	})
}

//////////////////////////////////////////////////////
// REFRESH TOKEN
//////////////////////////////////////////////////////

func Token(c *gin.Context) {

	project := c.MustGet("project").(*repository.Project)

	var body struct {
		RefreshToken string `json:"refresh_token" binding:"required"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"error": err.Error()})
		return
	}

	access, refresh, err :=
		service.RefreshToken(
			body.RefreshToken,
			project.JWTSecret,
			c.ClientIP(),
			c.Request.UserAgent(),
		)

	if err != nil {
		c.JSON(http.StatusUnauthorized,
			gin.H{"error": "invalid refresh token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token":  access,
		"refresh_token": refresh,
	})
}

//////////////////////////////////////////////////////
// LOGOUT
//////////////////////////////////////////////////////

func Logout(c *gin.Context) {
	userID := c.GetString("user_id")

	var body struct {
		RefreshToken string `json:"refresh_token" binding:"required"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"error": err.Error()})
		return
	}

	hash := sha256.Sum256([]byte(body.RefreshToken))

	repository.RevokeSession(
		hex.EncodeToString(hash[:]),
		userID,
	)

	c.JSON(http.StatusOK,
		gin.H{"status": "logged out"})
}

func Me(c *gin.Context) {

	userID := c.GetString("user_id")
	projectID := c.GetString("project_id")

	user, err := repository.GetUserByID(userID, projectID)
	if err != nil {
		println("error", err.Error())
		c.JSON(http.StatusNotFound,
			gin.H{"error": "user not found"})
		return
	}

	c.JSON(http.StatusOK, user)
}

func LogoutAll(c *gin.Context) {

	projectID := c.GetString("project_id")
	userID := c.GetString("user_id")

	service.LogoutAll(projectID, userID)

	c.JSON(200, gin.H{
		"status": "all sessions revoked",
	})
}

func VerifyEmail(c *gin.Context) {

	token := c.Query("token")
	println("token", token)

	if token == "" {
		c.JSON(400, gin.H{"error": "token is required"})
		return
	}

	err := service.VerifyEmail(token)
	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"status": "email verified"})
}

func ForgotPassword(c *gin.Context) {

	project := c.MustGet("project").(*repository.Project)

	var body struct {
		Email string `json:"email" binding:"required,email"`
	}

	c.ShouldBindJSON(&body)

	service.ForgotPassword(project.ID, body.Email)

	c.JSON(200, gin.H{
		"status": "if account exists, reset email sent",
	})
}

func ResetPassword(c *gin.Context) {

	var body struct {
		Token       string `json:"token"`
		NewPassword string `json:"new_password"`
	}

	c.ShouldBindJSON(&body)

	err := service.ResetPassword(
		body.Token,
		body.NewPassword,
	)

	if err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{
		"status": "password updated",
	})
}

func Refresh(c *gin.Context) {

	var req struct {
		RefreshToken string `json:"refresh_token"`
	}

	if err := c.BindJSON(&req); err != nil {
		return
	}

	project := c.MustGet("project").(*repository.Project)

	// hash incoming token
	hash := utils.HashToken(req.RefreshToken)

	// get session
	userID, projectID, email, err := repository.GetSession(hash)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid refresh token",
		})
		return
	}

	// 🚨 DELETE OLD TOKEN (rotation step)
	err = repository.DeleteSession(hash)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to rotate token",
		})
		return
	}

	// ✅ generate new access token
	accessToken, err := utils.GenerateAccessToken(
		userID,
		projectID,
		email,
		project.JWTSecret,
	)
	if err != nil {
		return
	}

	// ✅ generate new refresh token
	newRefreshToken, newHash, err := utils.GenerateRefreshToken()
	if err != nil {
		return
	}

	// store new session
	err = repository.CreateSession(
		projectID,
		userID,
		newHash,
		email,
		c.ClientIP(),
		c.Request.UserAgent(),
	)
	if err != nil {
		return
	}

	// 🎯 return both tokens
	c.JSON(http.StatusOK, gin.H{
		"access_token":  accessToken,
		"refresh_token": newRefreshToken,
	})
}

func RotateJWTSecret(c *gin.Context) {

	projectID := c.Param("id")

	secret, _, err1 := utils.GenerateSecureToken()

	if err1 != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to generate jwt secret",
		})
		return
	}

	err := repository.UpdateJWTSecret(projectID, secret)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to update jwt secret",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"jwt_secret": secret,
	})
}
