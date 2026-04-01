package utils

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/rand"
	"crypto/sha256"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"io"
	"os"
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

func getMasterKey() ([]byte, error) {

	keyHex := os.Getenv("CI_SECRET")

	key, err := hex.DecodeString(keyHex)
	if err != nil {
		return nil, errors.New("invalid hex master key")
	}

	if len(key) != 32 {
		return nil, errors.New("MASTER KEY must be 32 bytes")
	}

	return key, nil
}

func EncryptWithMasterKey(plaintext string) (string, error) {

	key, err := getMasterKey()
	if err != nil {
		return "", err
	}

	block, err := aes.NewCipher(key)
	if err != nil {
		return "", err
	}

	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return "", err
	}

	nonce := make([]byte, gcm.NonceSize())

	if _, err := io.ReadFull(rand.Reader, nonce); err != nil {
		return "", err
	}

	ciphertext := gcm.Seal(
		nonce,
		nonce,
		[]byte(plaintext),
		nil,
	)

	return base64.StdEncoding.EncodeToString(ciphertext), nil
}
