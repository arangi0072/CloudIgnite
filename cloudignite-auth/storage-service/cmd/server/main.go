package main

import (
	"log"
	"os"

	"storage-service/internal/db"
	"storage-service/internal/handler"
	"storage-service/internal/middleware"
	"storage-service/internal/storage"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	if err := godotenv.Load(); err != nil {
		panic("failed to load environment variables")
	}

	db.ConnectStorageDB()
	storage.InitMinio()

	r := gin.Default()

	v1 := r.Group("/v1/storage")
	v1.Use(middleware.ProjectMiddleware())

	v1.GET("/buckets/:bucket", handler.GetBucket)
	v1.PATCH("/buckets/:bucket", handler.UpdateBucket)
	v1.DELETE("/buckets/:bucket", handler.DeleteBucket)

	v1.POST("/upload", handler.UploadObject)
	v1.DELETE("/object", handler.DeleteObject)
	v1.PATCH("/meta", handler.UpdateMetadata)
	v1.GET("/meta", handler.GetMetadata)
	v1.GET("/download", handler.Download)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8082"
	}

	log.Println("Storage service running on", port)

	r.Run(":" + port)
}
