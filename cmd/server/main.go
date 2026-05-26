package main

import (
	"cloudignite-auth/internal/db"
	"cloudignite-auth/internal/handler"
	"cloudignite-auth/internal/middleware"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(); err != nil {
		panic("failed to load environment variables")
	}

	db.Connect()

	router := gin.Default()

	router.Use(cors.New(cors.Config{
		AllowOrigins: []string{
			"https://cloudignite.in",
			"http://localhost:3000",
			"https://hoppscotch.io", // ADD THIS
		},
		AllowMethods: []string{
			"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS",
		},
		AllowHeaders: []string{
			"Origin", "Content-Type", "Authorization",
		},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	api := router.Group("/v1")

	// public auth
	api.POST("/signup", handler.Signup)
	api.POST("/login", handler.Login)

	// authenticated control plane
	auth := api.Group("/")
	auth.Use(middleware.AuthMiddleware())

	auth.POST("/projects", handler.CreateProject)
	auth.GET("/projects", handler.ListProjects)

	auth.GET("/projects/:id", handler.GetProject)
	auth.PATCH("/projects/:id", handler.UpdateProject)
	auth.DELETE("/projects/:id", handler.DeleteProject)
	auth.POST("/projects/:id/restore", handler.RestoreProject)

	auth.POST("/projects/:id/services", handler.CreateService)
	auth.GET("/projects/:id/services", handler.ListServices)

	// Services
	auth.GET("/services/:id", handler.GetService)
	auth.DELETE("/services/:id", handler.DeleteService)

	auth.POST("/services/:id/suspend", handler.SuspendService)
	auth.POST("/services/:id/resume", handler.ResumeService)

	// auth.GET("/services/:id/usage", handler.GetServiceUsage)
	// auth.GET("/services/:id/logs", handler.GetServiceLogs)

	keys := auth.Group("/projects/:id/services/:service_id/keys")

	keys.GET("/", handler.ListKeys)
	keys.GET("/publishable", handler.GetPublishableKey)
	keys.GET("/initial-secret", handler.GetInitialSecret)
	keys.POST("/rotate", handler.RotateSecret)
	keys.DELETE("/:key_id", handler.RevokeKey)

	router.Run(":8000")
}
