package service

import (
	"context"
	"log"
	"strings"
	"time"

	"auth-service/internal/db"
	"auth-service/internal/utils"

	"github.com/google/uuid"
)

func ProcessUsageSync() {

	ctx := context.Background()

	// 🔍 Scan all usage keys
	keys, err := utils.RedisClient.Keys(ctx, "usage:*").Result()
	if err != nil {
		log.Println("Redis scan error:", err)
		return
	}

	for _, key := range keys {

		// usage:project:service:metric:month
		parts := strings.Split(key, ":")

		if len(parts) != 5 {
			continue
		}

		projectID := parts[1]
		service := parts[2]
		metric := parts[3]
		month := parts[4]

		count, err := utils.RedisClient.Get(ctx, key).Int64()
		if err != nil {
			continue
		}

		// 🗓 parse month
		periodStart, _ := time.Parse("2006-01", month)

		// 🔥 UPSERT monthly
		_, err = db.Pool.Exec(ctx, `
			INSERT INTO project_usage (
				id, project_id, service, metric_type, period_start, usage_count
			)
			VALUES ($1,$2,$3,$4,$5,$6)
			ON CONFLICT (project_id, service, metric_type, period_start)
			DO UPDATE SET usage_count = $6
		`,
			uuid.New(),
			projectID,
			service,
			metric,
			periodStart,
			count,
		)

		if err != nil {
			log.Println("DB monthly error:", err)
			continue
		}

		// 📅 DAILY
		today := time.Now().UTC().Format("2006-01-02")

		_, err = db.Pool.Exec(ctx, `
			INSERT INTO project_usage_daily (
				id, project_id, service, metric_type, date, usage_count
			)
			VALUES ($1,$2,$3,$4,$5,$6)
			ON CONFLICT (project_id, service, metric_type, date)
			DO UPDATE SET usage_count = $6
		`,
			uuid.New(),
			projectID,
			service,
			metric,
			today,
			count,
		)

		if err != nil {
			log.Println("DB daily error:", err)
			continue
		}
	}
}
