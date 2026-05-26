package db

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var StoragePool *pgxpool.Pool

func ConnectStorageDB() {

	dsn := os.Getenv("STORAGE_DATABASE_URL")

	pool, err := pgxpool.New(context.Background(), dsn)
	if err != nil {
		log.Fatal("DB connection failed:", err)
	}

	StoragePool = pool

	log.Println("Storage DB Connected")
}
