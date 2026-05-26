package middleware

import (
	"crypto/sha256"
	"encoding/hex"
	"log"
	"strings"

	"storage-service/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

func ProjectMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		key := c.GetHeader("x-api-key")

		if key == "" {
			c.AbortWithStatusJSON(401,
				gin.H{"error": "missing api key"})
			return
		}

		hash := sha256.Sum256([]byte(key))
		keyHash := hex.EncodeToString(hash[:])

		projectID, err := utils.GetProjectByPKHash(keyHash)

		if err != nil {
			log.Println("project lookup failed:", err)
			c.AbortWithStatusJSON(401,
				gin.H{"error": "invalid api key"})
			return
		}

		c.Set("project_id", projectID)

		c.Next()
	}
}

func JWTMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		auth := c.GetHeader("Authorization")

		if auth == "" {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "missing token",
			})
			return
		}

		tokenString := strings.TrimPrefix(auth, "Bearer ")

		if tokenString == "" {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "invalid token",
			})
			return
		}

		//////////////////////////////////////////////////
		// Parse token WITHOUT verification
		//////////////////////////////////////////////////

		parser := jwt.NewParser(
			jwt.WithoutClaimsValidation(),
		)

		unverified := &utils.AccessClaims{}

		token, _, err := parser.ParseUnverified(
			tokenString,
			unverified,
		)

		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "invalid token",
			})
			return
		}

		//////////////////////////////////////////////////
		// Extract KID
		//////////////////////////////////////////////////

		kidValue, ok := token.Header["kid"]
		if !ok {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "missing kid",
			})
			return
		}

		kid, ok := kidValue.(string)
		if !ok {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "invalid kid",
			})
			return
		}

		//////////////////////////////////////////////////
		// Fetch RSA public key from auth service
		//////////////////////////////////////////////////

		publicKey, err := utils.GetPublicKeyByKID(
			unverified.ProjectID,
			kid,
		)

		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "failed to fetch public key",
			})
			return
		}

		//////////////////////////////////////////////////
		// VERIFY TOKEN
		//////////////////////////////////////////////////

		claims, err := utils.VerifyAccessToken(
			tokenString,
			publicKey,
		)

		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{
				"error": "invalid or expired token",
			})
			return
		}

		//////////////////////////////////////////////////
		// Attach claims to context
		//////////////////////////////////////////////////

		c.Set("user_id", claims.UserID)
		c.Set("email", claims.Email)
		c.Set("project_id", claims.ProjectID)
		c.Set("session_id", claims.SessionID)
		c.Set("device_id", claims.DeviceID)

		c.Next()
	}
}

func SecretKeyMiddleware() gin.HandlerFunc {

	return func(c *gin.Context) {

		auth := c.GetHeader("Authorization")

		if auth == "" {
			c.AbortWithStatusJSON(401,
				gin.H{"error": "missing token"})
			return
		}

		key :=
			strings.TrimPrefix(auth, "Bearer ")

		if key == "" {
			c.AbortWithStatusJSON(401,
				gin.H{"error": "missing secret key"})
			return
		}

		// enforce prefix
		if !strings.HasPrefix(key, "sk_ci_") {
			c.AbortWithStatusJSON(401,
				gin.H{"error": "invalid secret key"})
			return
		}

		hash := sha256.Sum256([]byte(key))
		keyHash := hex.EncodeToString(hash[:])

		projectID, err := utils.GetProjectBySecretHash(keyHash)

		if err != nil {
			c.AbortWithStatusJSON(401,
				gin.H{"error": "invalid secret key"})
			return
		}

		c.Set("project_id", projectID)

		c.Next()
	}
}
