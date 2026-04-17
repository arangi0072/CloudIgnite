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

		// 🔑 Get API Key
		keyToken := c.GetHeader("x-api-key")
		if keyToken == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "missing api key",
			})
			return
		}

		// 🔐 Hash API Key
		hash := sha256.Sum256([]byte(keyToken))
		keyHash := hex.EncodeToString(hash[:])

		// 📦 Fetch Project
		project, err := repository.GetProjectByPKHash(keyHash)
		if err != nil || project == nil || project.ID == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "invalid api key",
			})
			return
		}

		projectID := project.ID

		// 👉 Pass project to next handlers
		c.Set("project", project)

		// 🗓 Time Keys
		now := time.Now().UTC()
		month := now.Format("2006-01")
		today := now.Format("2006-01-02")

		dailyKey := fmt.Sprintf(
			"usage_daily:%s:%s:%s:%s",
			projectID, serviceName, metric, today,
		)

		monthlyKey := fmt.Sprintf(
			"usage:%s:%s:%s:%s",
			projectID, serviceName, metric, month,
		)

		// ⚡ Redis Pipeline (better performance)
		pipe := utils.RedisClient.TxPipeline()

		_ = pipe.Incr(utils.Ctx, dailyKey)
		monthlyCmd := pipe.Incr(utils.Ctx, monthlyKey)

		_, redisErr := pipe.Exec(utils.Ctx)
		if redisErr != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"error": "redis error",
			})
			return
		}

		count := monthlyCmd.Val()

		// ⏳ Set Expiry (only first time)
		if count == 1 {
			// Monthly expiry
			utils.RedisClient.Expire(
				utils.Ctx,
				monthlyKey,
				timeUntilMonthEnd(),
			)

			// Daily expiry
			utils.RedisClient.Expire(
				utils.Ctx,
				dailyKey,
				24*time.Hour,
			)
		}

		// 📊 Get Quota
		quota, err := service.GetQuota(projectID)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"error": "quota fetch failed",
			})
			return
		}

		limit := resolveLimit(quota, serviceName, metric)

		// 🚫 Enforce Limit
		if limit > 0 && count > limit {
			c.AbortWithStatusJSON(http.StatusTooManyRequests, gin.H{
				"error":  "quota exceeded",
				"limit":  limit,
				"used":   count,
				"metric": metric,
			})
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
		switch metric {
		case "bandwidth":
			return q.Storage.Bandwidth
		case "storage":
			return q.Storage.StorageUsed
		default:
			return q.Storage.StorageUsed
		}
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
