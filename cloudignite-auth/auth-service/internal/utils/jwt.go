package utils

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
)

func VerifyAccessToken(
	tokenString string,
	secret string,
) (*AccessClaims, error) {

	token, err := jwt.ParseWithClaims(
		tokenString,
		&AccessClaims{},
		func(t *jwt.Token) (interface{}, error) {

			// 🔥 Prevent algorithm attack
			if _, ok :=
				t.Method.(*jwt.SigningMethodHMAC); !ok {

				return nil,
					jwt.ErrSignatureInvalid
			}

			return []byte(secret), nil
		},
	)

	if err != nil {
		return nil, err
	}

	claims, ok :=
		token.Claims.(*AccessClaims)

	if !ok || !token.Valid {
		return nil, errors.New("invalid token")
	}

	return claims, nil
}
func GenerateAccessToken(
	userID string,
	projectID string,
	email string,
	secret string,
) (string, error) {

	now := time.Now()

	claims := AccessClaims{
		UserID:    userID,
		ProjectID: projectID,
		Email:     email,

		RegisteredClaims: jwt.RegisteredClaims{

			// subject = user
			Subject: userID,

			// issuer = your auth service
			Issuer: "cloudignite-auth",

			// audience = project
			Audience: jwt.ClaimStrings{projectID},

			ExpiresAt: jwt.NewNumericDate(
				now.Add(15 * time.Minute),
			),

			IssuedAt: jwt.NewNumericDate(now),

			NotBefore: jwt.NewNumericDate(now),

			// unique token id
			ID: uuid.New().String(),
		},
	}

	token := jwt.NewWithClaims(
		jwt.SigningMethodHS256,
		claims,
	)

	return token.SignedString([]byte(secret))
}

func GenerateEmailToken() (raw string, hash string, err error) {

	bytes := make([]byte, 32)

	_, err = rand.Read(bytes)
	if err != nil {
		return
	}

	raw = base64.RawURLEncoding.EncodeToString(bytes)

	hashBytes := sha256.Sum256([]byte(raw))

	hash = hex.EncodeToString(hashBytes[:])

	return
}

func HashToken(token string) string {

	hash := sha256.Sum256([]byte(token))

	return hex.EncodeToString(hash[:])
}
