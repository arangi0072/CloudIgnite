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

	// =========================
	// 🔥 MONTHLY SYNC
	// =========================
	monthlyKeys, err := utils.RedisClient.Keys(ctx, "usage:*").Result()
	if err != nil {
		log.Println("Redis monthly scan error:", err)
		return
	}

	for _, key := range monthlyKeys {

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

		periodStart, err := time.Parse("2006-01", month)
		if err != nil {
			continue
		}

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
	}

	// =========================
	// 📅 DAILY SYNC
	// =========================
	dailyKeys, err := utils.RedisClient.Keys(ctx, "usage_daily:*").Result()
	if err != nil {
		log.Println("Redis daily scan error:", err)
		return
	}

	for _, key := range dailyKeys {

		// usage_daily:project:service:metric:date
		parts := strings.Split(key, ":")

		if len(parts) != 5 {
			continue
		}

		projectID := parts[1]
		service := parts[2]
		metric := parts[3]
		date := parts[4]

		count, err := utils.RedisClient.Get(ctx, key).Int64()
		if err != nil {
			continue
		}

		parsedDate, err := time.Parse("2006-01-02", date)
		if err != nil {
			continue
		}

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
			parsedDate,
			count,
		)

		if err != nil {
			log.Println("DB daily error:", err)
			continue
		}
	}
}
