package utils

import (
	"os"
	"time"

	"crypto/rand"
	"encoding/hex"

	"github.com/golang-jwt/jwt/v5"
)

func GenerateJWT(userID string) (string, error) {

	claims := jwt.MapClaims{
		"sub": userID,
		"exp": time.Now().Add(time.Hour * 72).Unix(),
	}

	token := jwt.NewWithClaims(
		jwt.SigningMethodHS256,
		claims,
	)

	return token.SignedString(
		[]byte(os.Getenv("JWT_SECRET")),
	)
}

func GenerateJWTSecret() string {

	b := make([]byte, 64)

	_, err := rand.Read(b)
	if err != nil {
		panic(err) // crypto failure is fatal
	}

	return hex.EncodeToString(b)
}
