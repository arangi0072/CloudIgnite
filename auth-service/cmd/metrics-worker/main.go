package main

import (
	"log"
	"time"

	"auth-service/internal/db"
	"auth-service/internal/service"
	"auth-service/internal/utils"

	"github.com/joho/godotenv"
)

func main() {

	_ = godotenv.Load()

	// DB
	db.Connect()

	// Redis
	utils.InitRedis()

	log.Println("Metrics Worker Started...")

	for {
		service.ProcessUsageSync()
		time.Sleep(10 * time.Second) // run every 10s
	}
}
