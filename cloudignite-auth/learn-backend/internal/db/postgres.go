package db

import (
	"context"
	"log"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var DB *pgxpool.Pool

func ConnectDB() {
	url := os.Getenv("DATABASE_URL")

	var currentDB string

	pool, err := pgxpool.New(context.Background(), url)
	if err != nil {
		log.Fatal(err)
	}

	err = pool.QueryRow(
		context.Background(),
		"SELECT current_database()",
	).Scan(&currentDB)

	if err != nil {
		log.Fatal(err)
	}

	log.Println("Connected Database:", currentDB)

	if err := pool.Ping(context.Background()); err != nil {
		log.Fatal("Database ping failed:", err)
	}

	DB = pool

	log.Println("PostgreSQL connected successfully")
}
