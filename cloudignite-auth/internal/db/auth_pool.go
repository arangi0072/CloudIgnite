package db

import (
	"context"
	"os"

	"github.com/jackc/pgx/v5/pgxpool"
)

var AuthPool *pgxpool.Pool

func ConnectAuthDB() {

	url := os.Getenv("AUTH_DATABASE_URL")

	pool, err := pgxpool.New(context.Background(), url)
	if err != nil {
		panic("failed to connect auth db: " + err.Error())
	}

	AuthPool = pool
}
