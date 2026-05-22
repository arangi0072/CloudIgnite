package utils

import "github.com/golang-jwt/jwt/v5"

// ============================================
// ACCESS CLAIMS
// ============================================

type AccessClaims struct {
	UserID    string `json:"uid"`
	ProjectID string `json:"pid"`
	Email     string `json:"email"`

	SessionID string `json:"sid"`
	DeviceID  string `json:"did"`

	jwt.RegisteredClaims
}
