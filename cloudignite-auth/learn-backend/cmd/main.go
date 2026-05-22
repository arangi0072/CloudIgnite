package main

import (
	"log"
	"os"

	"cloudignite-learn/internal/db"
	"cloudignite-learn/internal/routes"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found")
	}

	db.ConnectDB()

	router := gin.Default()

	router.Use(cors.Default())

	routes.SetupRoutes(router)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("Server running on port", port)

	router.Run(":" + port)
}
