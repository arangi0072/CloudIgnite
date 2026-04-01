package utils

import "github.com/golang-jwt/jwt/v5"

type AccessClaims struct {
	UserID    string `json:"sub"`
	ProjectID string `json:"pid"`
	Email     string `json:"email"`
	jwt.RegisteredClaims
}
