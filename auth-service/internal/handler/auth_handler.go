package handler

import (
	"auth-service/internal/repository"
	"auth-service/internal/service"
	"auth-service/internal/utils"
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
// ============================================
// LOGIN CONTROLLER
// ============================================

func Login(c *gin.Context) {

	project := c.MustGet("project").(*repository.Project)

	var body struct {
		Email    string `json:"email" binding:"required,email"`
		Password string `json:"password" binding:"required"`

		DeviceID    string `json:"device_id" binding:"required"`
		DeviceName  string `json:"device_name"`
		Fingerprint string `json:"fingerprint"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest,
			gin.H{"error": err.Error()})
		return
	}

	ip := c.ClientIP()
	userAgent := c.Request.UserAgent()

	access, refresh, user, err := service.Login(
		project.ID,

		body.Email,
		body.Password,

		body.DeviceID,
		body.DeviceName,
		body.Fingerprint,

		ip,
		userAgent,

		project.PrivateKey,
		project.KeyID,
	)

	if err != nil {
		c.JSON(http.StatusUnauthorized,
			gin.H{"error": "invalid credentials"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token":  access,
		"refresh_token": refresh,
		"expires_in":    900,

		"user": gin.H{
			"id":       user.ID,
			"email":    user.Email,
			"verified": user.EmailVerified,
		},
	})
}

//////////////////////////////////////////////////////
// LOGOUT
//////////////////////////////////////////////////////

//////////////////////////////////////////////////////
// LOGOUT CURRENT SESSION
//////////////////////////////////////////////////////

func Logout(c *gin.Context) {

	sessionID := c.GetString("session_id")

	if sessionID == "" {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "missing session",
		})
		return
	}

	err := repository.RevokeSession(sessionID)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to revoke session",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"status": "logged out",
	})
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

//////////////////////////////////////////////////////
// LOGOUT ALL SESSIONS
//////////////////////////////////////////////////////

func LogoutAll(c *gin.Context) {

	projectID := c.GetString("project_id")
	userID := c.GetString("user_id")

	err := service.LogoutAll(
		projectID,
		userID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to revoke sessions",
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
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
		RefreshToken string `json:"refreshToken"`
	}

	if err := c.BindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid request",
		})
		return
	}

	project := c.MustGet("project").(*repository.Project)

	//////////////////////////////////////////////////
	// HASH TOKEN
	//////////////////////////////////////////////////

	hash := utils.HashToken(req.RefreshToken)

	//////////////////////////////////////////////////
	// GET REFRESH TOKEN
	//////////////////////////////////////////////////

	refreshToken, err :=
		repository.GetRefreshToken(hash)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid refresh token",
		})
		return
	}

	//////////////////////////////////////////////////
	// REPLAY DETECTION
	//////////////////////////////////////////////////

	if refreshToken.UsedAt.Valid {

		// 🚨 replay attack detected

		_ = repository.RevokeSession(refreshToken.SessionID)

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "refresh token replay detected",
		})

		return
	}

	//////////////////////////////////////////////////
	// GET SESSION
	//////////////////////////////////////////////////

	session, err := repository.GetSessionByID(
		refreshToken.SessionID,
	)

	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "invalid session",
		})
		return
	}

	//////////////////////////////////////////////////
	// SESSION REVOKED?
	//////////////////////////////////////////////////

	if session.Revoked {

		c.JSON(http.StatusUnauthorized, gin.H{
			"error": "session revoked",
		})

		return
	}

	//////////////////////////////////////////////////
	// MARK TOKEN USED
	//////////////////////////////////////////////////

	err = repository.MarkRefreshTokenUsed(
		refreshToken.ID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to rotate token",
		})
		return
	}

	//////////////////////////////////////////////////
	// CREATE NEW REFRESH TOKEN
	//////////////////////////////////////////////////

	newRefreshToken, newHash, err :=
		utils.GenerateRefreshToken()

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to generate refresh token",
		})
		return
	}

	err = repository.CreateRefreshToken(
		session.ID,
		newHash,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to store refresh token",
		})
		return
	}

	//////////////////////////////////////////////////
	// UPDATE SESSION LAST SEEN
	//////////////////////////////////////////////////

	_ = repository.UpdateSessionLastSeen(
		session.ID,
		c.ClientIP(),
	)

	//////////////////////////////////////////////////
	// GENERATE NEW ACCESS TOKEN
	//////////////////////////////////////////////////

	accessToken, err := utils.GenerateAccessToken(
		session.UserID,
		session.ProjectID,
		session.Email,

		session.ID,
		session.DeviceID,

		project.PrivateKey,
		project.KeyID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to generate access token",
		})
		return
	}

	//////////////////////////////////////////////////
	// RESPONSE
	//////////////////////////////////////////////////

	c.JSON(http.StatusOK, gin.H{
		"access_token":  accessToken,
		"refresh_token": newRefreshToken,
		"expires_in":    900,
	})
}

func RotateKeys(c *gin.Context) {

	projectID := c.Param("id")

	////////////////////////////////////////////////////
	// GENERATE NEW RSA KEYS
	////////////////////////////////////////////////////

	privateKeyPEM, publicKeyPEM, err := utils.GenerateRSAKeys()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to generate keys",
		})
		return
	}

	keyID, err := utils.GenerateSecureHex(8)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to generate key id",
		})
		return
	}

	////////////////////////////////////////////////////
	// STORE NEW KEYS
	////////////////////////////////////////////////////

	err = repository.UpdateProjectKeys(
		projectID,
		privateKeyPEM,
		publicKeyPEM,
		keyID,
	)

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": "failed to update keys",
		})
		return
	}

	////////////////////////////////////////////////////
	// OPTIONAL: CLEAR JWKS CACHE
	////////////////////////////////////////////////////

	utils.InvalidateJWKSCache(projectID)

	c.JSON(http.StatusOK, gin.H{
		"message": "keys rotated successfully",
		"key_id":  keyID,
	})
}

func GetJWKS(c *gin.Context) {

	projectID := c.Param("project_id")

	project, err := repository.GetProjectById(projectID)
	if err != nil {
		c.JSON(404, gin.H{"error": "not found"})
		return
	}

	c.JSON(200, gin.H{
		"keys": []gin.H{
			{
				"kid":        project.KeyID,
				"alg":        "RS256",
				"kty":        "RSA",
				"use":        "sig",
				"public_key": project.PublicKey,
			},
		},
	})
}
