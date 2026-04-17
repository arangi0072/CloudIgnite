package main

import (
	"auth-service/internal/db"
	"auth-service/internal/handler"
	"auth-service/internal/middleware"
	"auth-service/internal/utils"
	"context"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	// Load environment variables

	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env not found, using system env")
	}

	// Connect database

	db.ConnectAuthDB()
	db.Connect()
	utils.InitRedis()

	// Set production mode

	gin.SetMode(gin.ReleaseMode)

	router := gin.New()

	// Core middleware

	router.Use(gin.Logger())
	router.Use(gin.Recovery())
	// router.Use(gin.BodyLimit("10MB"))

	// Trusted proxies (IMPORTANT for security)

	router.SetTrustedProxies([]string{
		"127.0.0.1",
		"::1",
	})

	// CORS configuration

	router.Use(cors.New(cors.Config{

		AllowOrigins: []string{
			"https://cloudignite.in",
			"https://api.cloudignite.in",
			"https://auth.cloudignite.in",
			"http://localhost:3000",
		},

		AllowMethods: []string{
			"GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS",
		},

		AllowHeaders: []string{
			"Origin",
			"Content-Type",
			"Authorization",
			"X-API-Key",
		},

		ExposeHeaders: []string{
			"Content-Length",
		},

		AllowCredentials: true,

		MaxAge: 12 * time.Hour,
	}))

	// Health check endpoint

	router.GET("/health", func(c *gin.Context) {

		c.JSON(http.StatusOK, gin.H{
			"status":  "ok",
			"service": "cloudignite-auth",
			"time":    time.Now().UTC(),
		})

	})

	// Auth routes

	auth := router.Group("/v1/auth")
	auth.Use(middleware.RateLimiter())
	auth.Use(middleware.ProjectMiddleware())
	auth.Use(middleware.QuotaMiddleware("auth", "api_calls"))

	authPublic := router.Group("/v1/auth")

	// public
	auth.POST("/signup", handler.Signup)
	auth.POST("/login", handler.Login)
	auth.POST("/refresh", handler.Refresh)
	authPublic.GET("/verify-email", handler.VerifyEmail)
	auth.POST("/forgot-password", handler.ForgotPassword)
	auth.POST("/reset-password", handler.ResetPassword)

	// Protected routes

	protected := auth.Group("/")
	protected.Use(middleware.JWTMiddleware())

	protected.POST("/logout", handler.Logout)
	protected.POST("/logout-all", handler.LogoutAll)

	protected.GET("/me", handler.Me)

	protected.GET("/sessions", handler.ListSessions)
	protected.POST("/sessions/:id/revoke", handler.RevokeSession)
	protected.POST("/sessions/revoke-others", handler.RevokeOtherSessions)

	protected.POST("/email/resend-verification", handler.ResendVerification)
	protected.POST("/email/change", handler.ChangeEmail)
	protected.POST("/email/confirm-change", handler.ConfirmChange)
	protected.GET("/email/status", handler.EmailStatus)

	// Admin routes

	admin := router.Group("/v1/admin")
	admin.Use(middleware.SecretKeyMiddleware())

	admin.POST("/users", handler.AdminCreateUser)
	admin.GET("/users", handler.AdminListUsers)
	admin.POST("/projects/:id/rotate-jwt-secret", handler.RotateJWTSecret)
	admin.DELETE("/users/:id", handler.AdminDeleteUser)
	admin.POST("/users/:id/disable", handler.AdminDisableUser)
	admin.POST("/users/:id/revoke-sessions", handler.AdminRevokeSessions)

	// HTTP server (production safe)

	port := os.Getenv("PORT")

	if port == "" {
		port = "8081"
	}

	server := &http.Server{
		Addr:           ":" + port,
		Handler:        router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		IdleTimeout:    60 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	// Start server

	go func() {

		log.Println("CloudIgnite Auth Service running on port", port)

		if err := server.ListenAndServe(); err != nil &&
			err != http.ErrServerClosed {

			log.Fatal("Server error:", err)

		}

	}()

	// Graceful shutdown

	quit := make(chan os.Signal, 1)

	signal.Notify(
		quit,
		syscall.SIGINT,
		syscall.SIGTERM,
	)

	<-quit

	log.Println("Shutting down CloudIgnite Auth Service...")

	ctx, cancel := context.WithTimeout(
		context.Background(),
		10*time.Second,
	)

	defer cancel()

	if err := server.Shutdown(ctx); err != nil {

		log.Fatal("Shutdown failed:", err)

	}

	log.Println("Server stopped gracefully")

}
