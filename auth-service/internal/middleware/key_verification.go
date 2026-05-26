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

		// 🔥 0. Get project from previous middleware
		projectVal, exists := c.Get("project")
		if !exists {
			c.AbortWithStatusJSON(401, gin.H{"error": "project not found"})
			return
		}
		project := projectVal.(*repository.Project)

		// 🔥 1. Get token
		auth := c.GetHeader("Authorization")
		if auth == "" {
			c.AbortWithStatusJSON(401, gin.H{"error": "missing token"})
			return
		}

		tokenString := strings.TrimPrefix(auth, "Bearer ")

		// 🔥 2. Parse unverified (get kid)
		token, _, err := new(jwt.Parser).ParseUnverified(tokenString, &utils.AccessClaims{})
		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{"error": "invalid token format"})
			return
		}

		kid, ok := token.Header["kid"].(string)
		if !ok || kid == "" {
			c.AbortWithStatusJSON(401, gin.H{"error": "missing kid"})
			return
		}

		// 🔥 3. Fetch public key USING project_id
		publicKey, err := utils.GetPublicKeyByKID(project.ID, kid)
		if err != nil {
			c.AbortWithStatusJSON(401, gin.H{"error": "key not found"})
			return
		}

		// 🔥 4. Verify token
		claims, err := utils.VerifyAccessToken(tokenString, publicKey)
		if err != nil {
			print(err.Error(), "  ", publicKey, "   token. ", tokenString)
			c.AbortWithStatusJSON(401, gin.H{"error": "invalid token"})
			return
		}

		// 🔐 5. STRONG VALIDATION (multi-tenant safety)

		// issuer check
		expectedIssuer := "cloudignite-auth"
		if claims.Issuer != expectedIssuer {
			c.AbortWithStatusJSON(401, gin.H{"error": "invalid issuer"})
			return
		}

		// 		// audience check
		// 		if len(claims.Audience) == 0 || !claims.Audience.Contains(project.ID) {
		// 	c.AbortWithStatusJSON(401, gin.H{"error": "invalid audience"})
		// 	return
		// }

		// project isolation check
		if claims.ProjectID != project.ID {
			c.AbortWithStatusJSON(401, gin.H{"error": "project mismatch"})
			return
		}

		// 🔥 6. Set context
		c.Set("user_id", claims.UserID)
		c.Set("email", claims.Email)
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
