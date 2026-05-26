package utils

import (
	"log"
	"os"
	"strconv"

	"github.com/joho/godotenv"
)

type SMTPConfig struct {
	Host     string
	Port     int
	Username string
	Password string
	From     string
	TLS      bool
}

func LoadSMTPConfig() SMTPConfig {

	err := godotenv.Load()
	if err != nil {
		log.Println("No .env file found, using system env")
	}

	port, _ := strconv.Atoi(os.Getenv("SMTP_PORT"))

	tlsEnabled := os.Getenv("SMTP_TLS") == "true"

	return SMTPConfig{
		Host:     os.Getenv("SMTP_HOST"),
		Port:     port,
		Username: os.Getenv("SMTP_USERNAME"),
		Password: os.Getenv("SMTP_PASSWORD"),
		From:     os.Getenv("SMTP_FROM"),
		TLS:      tlsEnabled,
	}
}
