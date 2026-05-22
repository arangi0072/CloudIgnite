package app

import (
	"storage-service/internal/middleware"

	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine, app *App) {

	v1 := r.Group("/v1/storage")
	v1.Use(middleware.ProjectMiddleware())

	// bucket
	v1.GET("/buckets/:bucket", app.BucketHandler.GetBucket)
	v1.PATCH("/buckets/:bucket", app.BucketHandler.UpdateBucket)
	v1.DELETE("/buckets/:bucket", app.BucketHandler.DeleteBucket)

	// policy
	v1.PUT(
		"/buckets/:bucket/policy",
		app.BucketHandler.SetBucketPolicy,
	)

	v1.GET(
		"/buckets/:bucket/policy",
		app.BucketHandler.GetBucketPolicy,
	)

	// upload
	v1.POST("/upload/init", app.ObjectHandler.InitUpload)
	v1.POST("/upload/confirm", app.ObjectHandler.ConfirmUpload)

	// object
	v1.DELETE("/object", app.ObjectHandler.DeleteObject)

	v1.PATCH(
		"/object/rename",
		app.ObjectHandler.RenameObject,
	)

	v1.POST(
		"/object/delete-multiple",
		app.ObjectHandler.DeleteMultipleObjects,
	)

	v1.GET(
		"/object/versions",
		app.ObjectHandler.GetObjectVersions,
	)

	v1.GET("/download", app.ObjectHandler.Download)

	v1.GET("/list", app.ObjectHandler.ListObjects)

	// metadata
	v1.PATCH("/meta", app.ObjectHandler.UpdateMetadata)

	v1.GET("/meta", app.ObjectHandler.GetMetadata)
}
