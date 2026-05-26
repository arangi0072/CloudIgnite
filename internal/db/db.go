package db

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var Pool *pgxpool.Pool
var StoragePool *pgxpool.Pool

func Connect() {
	databaseURL := os.Getenv("DATABASE_URL")

	pool, err := pgxpool.New(context.Background(), databaseURL)
	if err != nil {
		log.Fatal("Unable to connect to database:", err)
	}

	Pool = pool
}

func ConnectStorageDB() {

	dsn := os.Getenv("STORAGE_DATABASE_URL")

	pool, err := pgxpool.New(context.Background(), dsn)
	if err != nil {
		log.Fatal("DB connection failed:", err)
	}

	StoragePool = pool

	log.Println("Storage DB Connected")
}
