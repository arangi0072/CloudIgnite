package middleware

import (
	"crypto/sha256"
	"encoding/hex"
	"fmt"
	"net/http"
	"time"

	"auth-service/internal/models"
	"auth-service/internal/repository"
	"auth-service/internal/service"
	"auth-service/internal/utils"

	"github.com/gin-gonic/gin"
)

func QuotaMiddleware(serviceName string, metric string) gin.HandlerFunc {

	return func(c *gin.Context) {

		keyToken := c.GetHeader("x-api-key")

		if keyToken == "" {
			c.AbortWithStatusJSON(401,
				gin.H{"error": "missing api key"})
			return
		}

		hash := sha256.Sum256([]byte(keyToken))
		keyHash := hex.EncodeToString(hash[:])

		project, err := repository.GetProjectByPKHash(keyHash)

		projectID := project.ID

		if projectID == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "project not found"})
			c.Abort()
			return
		}

		// 🗓 month
		month := time.Now().UTC().Format("2006-01")

		// 🔑 key
		key := fmt.Sprintf(
			"usage:%s:%s:%s:%s",
			projectID,
			serviceName,
			metric,
			month,
		)

		// ⚡ increment
		count, err := utils.RedisClient.Incr(utils.Ctx, key).Result()
		if err != nil {
			c.JSON(500, gin.H{"error": "redis error"})
			c.Abort()
			return
		}

		// ⏳ expiry
		if count == 1 {
			utils.RedisClient.Expire(
				utils.Ctx,
				key,
				timeUntilMonthEnd(),
			)
		}

		// 📊 get quota
		quota, err := service.GetQuota(projectID)
		if err != nil {
			c.JSON(500, gin.H{"error": "quota fetch failed"})
			c.Abort()
			return
		}

		limit := resolveLimit(quota, serviceName, metric)

		// 🚫 block
		if limit > 0 && count > limit {
			c.JSON(http.StatusTooManyRequests, gin.H{
				"error":  "quota exceeded",
				"limit":  limit,
				"used":   count,
				"metric": metric,
			})
			c.Abort()
			return
		}

		c.Next()
	}
}

func resolveLimit(q models.Quotas, service, metric string) int64 {

	switch service {

	case "auth":
		return q.Auth.APICalls

	case "smtp":
		return q.SMTP.EmailsSent

	case "functions":
		return q.Functions.Invocations

	case "storage":
		if metric == "bandwidth" {
			return q.Storage.Bandwidth
		}
		return q.Storage.StorageUsed
	}

	return 0
}

func timeUntilMonthEnd() time.Duration {
	now := time.Now().UTC()
	nextMonth := time.Date(
		now.Year(),
		now.Month()+1,
		1, 0, 0, 0, 0,
		time.UTC,
	)
	return time.Until(nextMonth)
}
