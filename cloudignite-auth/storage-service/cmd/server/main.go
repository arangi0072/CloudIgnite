package main

import (
	"log"
	"os"

	"storage-service/internal/app"
	"storage-service/internal/db"
	"storage-service/internal/storage"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(); err != nil {
		panic("failed to load env")
	}

	// init infrastructure
	db.ConnectStorageDB()
	storage.InitMinio()

	// gin
	r := gin.Default()

	// app container
	a := app.NewApp()

	// routes
	app.RegisterRoutes(r, a)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8082"
	}

	log.Println("Storage service running on", port)

	r.Run(":" + port)
}
