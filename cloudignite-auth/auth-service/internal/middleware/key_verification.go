package middleware

import (
	"crypto/sha256"
	"encoding/hex"
	"log"
	"strings"

	"auth-service/internal/repository"
	"auth-service/internal/utils"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
)

type Project struct {
	ID        string `json:"project_id"`
	JWTSecret string `json:"-"`
}

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

		project, err := repository.GetProjectByPKHash(keyHash)

		if err != nil {
			log.Println("project lookup failed:", err.Error())
			c.AbortWithStatusJSON(401,
				gin.H{"error": "invalid api key"})
			return
		}

		c.Set("project", project)

		c.Next()
	}
}

func JWTMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {

		auth := c.GetHeader("Authorization")
		if auth == "" {
			c.AbortWithStatusJSON(401, gin.H{"error": "missing token"})
			return
		}

		tokenString := strings.TrimPrefix(auth, "Bearer ")

		// 🔥 Step 1: Parse token WITHOUT verifying (to get kid)
		token, _, err := new(jwt.Parser).ParseUnverified(tokenString, &utils.AccessClaims{})
		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{"error": "invalid token format"})
			return
		}

		// 🔥 Step 2: Extract KID
		kid, ok := token.Header["kid"].(string)
		if !ok || kid == "" {
			c.AbortWithStatusJSON(401, gin.H{"error": "missing kid"})
			return
		}

		// 🔥 Step 3: Get public key (cache or auth service)
		publicKey, err := utils.GetPublicKeyByKID(kid)
		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{"error": "key not found"})
			return
		}

		// 🔥 Step 4: Verify token
		claims, err := utils.VerifyAccessToken(tokenString, publicKey)
		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{"error": "invalid token"})
			return
		}

		// 🔐 Extra validation (VERY IMPORTANT)
		if claims.Issuer != "cloudignite-auth" {
			c.AbortWithStatusJSON(401, gin.H{"error": "invalid issuer"})
			return
		}

		// Optional (recommended)
		if len(claims.Audience) == 0 {
			c.AbortWithStatusJSON(401, gin.H{"error": "invalid audience"})
			return
		}

		// 🔥 Set context
		c.Set("user_id", claims.UserID)
		c.Set("project_id", claims.ProjectID)

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

		project, err :=
			repository.GetProjectBySecretHash(keyHash)

		if err != nil {
			c.AbortWithStatusJSON(401,
				gin.H{"error": "invalid secret key"})
			return
		}

		c.Set("project", project)

		c.Next()
	}
}
