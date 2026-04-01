package utils

import (
	"context"
	"os"

	"github.com/redis/go-redis/v9"
)

var Ctx = context.Background()
var RedisClient *redis.Client

func InitRedis() {

	RedisClient = redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_ADDR"),     // localhost:6379
		Password: os.Getenv("REDIS_PASSWORD"), // your password
		DB:       0,
	})
}
