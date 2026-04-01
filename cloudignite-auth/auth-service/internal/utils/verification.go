package utils

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
)

func GenerateSecureToken() (string, string, error) {

	b := make([]byte, 32)

	_, err := rand.Read(b)
	if err != nil {
		return "", "", err
	}

	raw := hex.EncodeToString(b)

	h := sha256.Sum256([]byte(raw))
	hash := hex.EncodeToString(h[:])

	return raw, hash, nil
}
