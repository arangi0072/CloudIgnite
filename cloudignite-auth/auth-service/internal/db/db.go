package db

import (
	"context"
	"log"
	"os"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

var AuthPool *pgxpool.Pool

func ConnectAuthDB() {

	dsn := os.Getenv("AUTH_DATABASE_URL")

	cfg, err := pgxpool.ParseConfig(dsn)
	if err != nil {
		panic(err)
	}

	// ⭐ VERY IMPORTANT TUNING
	cfg.MaxConns = 25
	cfg.MinConns = 5
	cfg.MaxConnLifetime = time.Hour
	cfg.MaxConnIdleTime = time.Minute * 30

	pool, err := pgxpool.NewWithConfig(context.Background(), cfg)
	if err != nil {
		panic(err)
	}

	AuthPool = pool
}

var Pool *pgxpool.Pool

func Connect() {
	databaseURL := os.Getenv("DATABASE_URL")

	pool, err := pgxpool.New(context.Background(), databaseURL)
	if err != nil {
		log.Fatal("Unable to connect to database:", err)
	}

	Pool = pool
}
