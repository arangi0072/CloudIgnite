package middleware

import (
	"crypto/sha256"
	"encoding/hex"
	"log"
	"strings"

	"storage-service/internal/utils"

	"github.com/gin-gonic/gin"
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

// func JWTMiddleware() gin.HandlerFunc {

// 	return func(c *gin.Context) {

// 		auth := c.GetHeader("Authorization")

// 		if auth == "" {
// 			c.AbortWithStatusJSON(401,
// 				gin.H{"error": "missing token"})
// 			return
// 		}

// 		tokenString :=
// 			strings.TrimPrefix(auth, "Bearer ")

// 		//////////////////////////////////////////////////
// 		// Parse unverified ONLY to read pid
// 		//////////////////////////////////////////////////

// 		parser := jwt.NewParser(
// 			jwt.WithoutClaimsValidation(),
// 		)

// 		unverified := &utils.AccessClaims{}

// 		_, _, err := parser.ParseUnverified(
// 			tokenString,
// 			unverified,
// 		)

// 		if err != nil {
// 			c.AbortWithStatusJSON(401,
// 				gin.H{"error": "invalid token"})
// 			return
// 		}

// 		//////////////////////////////////////////////////
// 		// Fetch secret
// 		//////////////////////////////////////////////////

// 		secret, err :=
// 			repository.GetProjectJWTSecret(
// 				unverified.ProjectID,
// 			)

// 		if err != nil {
// 			c.AbortWithStatusJSON(401,
// 				gin.H{"error": "project not found"})
// 			return
// 		}

// 		//////////////////////////////////////////////////
// 		// VERIFY
// 		//////////////////////////////////////////////////

// 		claims, err :=
// 			utils.VerifyAccessToken(
// 				tokenString,
// 				secret,
// 			)

// 		if err != nil {
// 			c.AbortWithStatusJSON(401,
// 				gin.H{"error": "invalid or expired"})
// 			return
// 		}

// 		//////////////////////////////////////////////////
// 		// Attach context
// 		//////////////////////////////////////////////////

// 		c.Set("user_id", claims.UserID)
// 		c.Set("email", claims.Email)
// 		c.Set("project_id", claims.ProjectID)

// 		c.Next()
// 	}
// }

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
