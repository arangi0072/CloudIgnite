package utils

import (
	"crypto/rand"
	"crypto/sha256"
	"encoding/hex"
)

func GenerateRefreshToken() (raw string, hash string, err error) {

	b := make([]byte, 32)

	_, err = rand.Read(b)
	if err != nil {
		return
	}

	raw = hex.EncodeToString(b)

	h := sha256.Sum256([]byte(raw))
	hash = hex.EncodeToString(h[:])

	return
}
