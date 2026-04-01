package utils

import (
	"crypto/rand"
	"encoding/hex"
)

func generateRandomHex(n int) string {
	b := make([]byte, n)
	rand.Read(b)
	return hex.EncodeToString(b)
}

func GeneratePublishableKey() string {
	return "pk_ci_" + generateRandomHex(24)
}
