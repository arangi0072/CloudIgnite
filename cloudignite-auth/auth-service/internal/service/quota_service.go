package service

import (
	"encoding/json"
	"time"

	"auth-service/internal/db"
	"auth-service/internal/models"
	"auth-service/internal/utils"
)

func GetQuota(projectID string) (models.Quotas, error) {

	var quota models.Quotas

	key := "quota:" + projectID

	// 🔥 Try Redis first
	val, err := utils.RedisClient.Get(utils.Ctx, key).Result()
	if err == nil {
		json.Unmarshal([]byte(val), &quota)
		return quota, nil
	}

	// 🔥 Fallback DB
	var quotaJSON string

	err = db.Pool.QueryRow(utils.Ctx, `
		SELECT quotas FROM projects WHERE id=$1
	`, projectID).Scan(&quotaJSON)

	if err != nil {
		return quota, err
	}

	json.Unmarshal([]byte(quotaJSON), &quota)

	// 🔥 Cache it
	utils.RedisClient.Set(
		utils.Ctx,
		key,
		quotaJSON,
		24*time.Hour,
	)

	return quota, nil
}
