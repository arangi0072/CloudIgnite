package main

import (
	"cloudignite-auth/internal/db"
	"cloudignite-auth/internal/handler"
	"cloudignite-auth/internal/middleware"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(); err != nil {
		panic("failed to load environment variables")
	}

	db.Connect()

	router := gin.Default()
	auth := router.Group("/")
	auth.Use(middleware.AuthMiddleware())

	auth.POST("/projects", handler.CreateProject)
	auth.GET("/projects", handler.ListProjects)

	router.POST("/signup", handler.Signup)
	router.POST("/login", handler.Login)
	auth.POST("/projects/:project_id/keys", handler.CreateAPIKey)
	auth.GET("/projects/:project_id/keys", handler.ListAPIKeys)
	auth.DELETE("/keys/:key_id", handler.RevokeAPIKey)
	auth.POST("/projects/:project_id/services", handler.CreateService)

	router.Run(":8080")
}
