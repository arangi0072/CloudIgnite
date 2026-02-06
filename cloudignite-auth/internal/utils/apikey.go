package utils

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
)

// generate random 32 bytes
func GenerateAPIKey() (string, string, error) {

	bytes := make([]byte, 32)

	_, err := rand.Read(bytes)
	if err != nil {
		return "", "", err
	}

	rawKey := "ci_live_" + hex.EncodeToString(bytes)

	hash := sha256.Sum256([]byte(rawKey))

	return rawKey, hex.EncodeToString(hash[:]), nil
}
