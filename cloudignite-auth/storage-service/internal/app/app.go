package app

import (
	"storage-service/internal/handler"
	"storage-service/internal/repository"
	"storage-service/internal/service"
)

type App struct {
	BucketHandler *handler.BucketHandler
	ObjectHandler *handler.ObjectHandler
}

func NewApp() *App {

	// repositories
	bucketRepo := &repository.BucketRepository{}
	objectRepo := &repository.ObjectRepository{}

	// services
	bucketService := &service.BucketService{
		Repo: bucketRepo,
	}

	objectService := &service.ObjectService{
		Repo: objectRepo,
	}

	// handlers
	return &App{
		BucketHandler: &handler.BucketHandler{
			Service: bucketService,
		},

		ObjectHandler: &handler.ObjectHandler{
			Service: objectService,
		},
	}
}
